import asyncHandler from 'express-async-handler';
import Visitor from '../models/Visitor.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Message from '../models/Message.js';
import Blog from '../models/Blog.js';

// @desc    Get visitor statistics and dashboard overview metrics
// @route   GET /api/analytics/visitors
// @access  Private/Admin
export const getVisitorStats = asyncHandler(async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const visitors = await Visitor.find({ timestamp: { $gte: thirtyDaysAgo } });

  // Build daily visitor counts map for chart
  const chartDataMap = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    chartDataMap[dateStr] = 0;
  }

  visitors.forEach(v => {
    if (v.timestamp) {
      const dateStr = new Date(v.timestamp).toISOString().split('T')[0];
      if (dateStr in chartDataMap) {
        chartDataMap[dateStr]++;
      }
    }
  });

  const chartData = Object.keys(chartDataMap).map(date => ({
    date,
    count: chartDataMap[date]
  })).sort((a, b) => a.date.localeCompare(b.date));

  // Unique visitors count
  const uniqueIPs = await Visitor.distinct('ip');
  const totalUniqueVisitors = uniqueIPs.length;

  // Recent visitors details
  const recentVisitors = await Visitor.find().sort({ timestamp: -1 }).limit(10);

  // Quick stats counters
  const [totalProjects, totalSkills, totalMessages, unreadMessages, totalBlogs] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ isRead: false }),
    Blog.countDocuments()
  ]);

  // Recent activity logs
  const recentMessagesList = await Message.find().sort({ createdAt: -1 }).limit(5);
  const recentBlogsList = await Blog.find().sort({ updatedAt: -1 }).limit(3);

  const recentActivity = [];
  recentMessagesList.forEach(m => {
    recentActivity.push({
      type: 'message',
      text: `Message received from ${m.name}: "${m.subject}"`,
      timestamp: m.createdAt
    });
  });

  recentBlogsList.forEach(b => {
    recentActivity.push({
      type: 'blog',
      text: `Blog "${b.title}" updated (${b.status})`,
      timestamp: b.updatedAt
    });
  });

  recentActivity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  res.json({
    chartData,
    totalUniqueVisitors,
    recentVisitors,
    quickStats: {
      totalProjects,
      totalSkills,
      totalMessages,
      unreadMessages,
      totalBlogs
    },
    recentActivity: recentActivity.slice(0, 10)
  });
});
