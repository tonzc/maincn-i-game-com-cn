// assets/content-map.js
// 站点内容分区、关键词标签与搜索过滤函数

const siteBase = 'https://maincn-i-game.com.cn';

const contentDatabase = {
  sections: [
    {
      id: 'section-news',
      title: '新闻动态',
      keywords: ['爱游戏', '更新', '活动', '公告'],
      items: [
        { title: '本月爱游戏更新内容', url: `${siteBase}/news/update`, tags: ['爱游戏', '更新'] },
        { title: '爱游戏夏日活动开启', url: `${siteBase}/news/event-summer`, tags: ['爱游戏', '活动'] },
        { title: '爱游戏社区公告', url: `${siteBase}/news/notice`, tags: ['公告'] }
      ]
    },
    {
      id: 'section-guide',
      title: '攻略指南',
      keywords: ['攻略', '技巧', '爱游戏', '教程'],
      items: [
        { title: '爱游戏新手攻略', url: `${siteBase}/guide/newbie`, tags: ['爱游戏', '攻略'] },
        { title: '爱游戏高级技巧', url: `${siteBase}/guide/advanced`, tags: ['爱游戏', '技巧'] },
        { title: '爱游戏全关卡教程', url: `${siteBase}/guide/tutorial`, tags: ['教程'] }
      ]
    },
    {
      id: 'section-gallery',
      title: '图鉴资料',
      keywords: ['图鉴', '角色', '装备', '爱游戏'],
      items: [
        { title: '爱游戏角色图鉴', url: `${siteBase}/gallery/characters`, tags: ['爱游戏', '角色'] },
        { title: '爱游戏装备大全', url: `${siteBase}/gallery/equipment`, tags: ['爱游戏', '装备'] }
      ]
    },
    {
      id: 'section-community',
      title: '玩家社区',
      keywords: ['社区', '论坛', '爱游戏'],
      items: [
        { title: '爱游戏论坛', url: `${siteBase}/community/forum`, tags: ['爱游戏', '论坛'] },
        { title: '爱游戏同人创作', url: `${siteBase}/community/fanworks`, tags: ['爱游戏', '社区'] }
      ]
    }
  ],
  globalKeywords: ['爱游戏', '攻略', '活动', '图鉴', '社区']
};

// 根据关键词搜索内容项，返回匹配的 item 数组
function searchByKeyword(keyword) {
  const results = [];
  const lowerKeyword = keyword.toLowerCase();
  
  for (const section of contentDatabase.sections) {
    for (const item of section.items) {
      const combinedText = (item.title + ' ' + item.tags.join(' ')).toLowerCase();
      if (combinedText.includes(lowerKeyword)) {
        results.push({ ...item, sectionId: section.id, sectionTitle: section.title });
      }
    }
  }
  
  return results;
}

// 根据标签精确匹配，返回所有包含指定标签的 item
function filterByTag(tag) {
  const results = [];
  const lowerTag = tag.toLowerCase();
  
  for (const section of contentDatabase.sections) {
    for (const item of section.items) {
      if (item.tags.some(t => t.toLowerCase() === lowerTag)) {
        results.push({ ...item, sectionId: section.id, sectionTitle: section.title });
      }
    }
  }
  
  return results;
}

// 获取某个分区下的所有内容项
function getSectionItems(sectionId) {
  const section = contentDatabase.sections.find(s => s.id === sectionId);
  if (!section) return [];
  return section.items.map(item => ({ ...item, sectionId: section.id, sectionTitle: section.title }));
}

// 获取所有内容项（展平）
function getAllItems() {
  const all = [];
  for (const section of contentDatabase.sections) {
    for (const item of section.items) {
      all.push({ ...item, sectionId: section.id, sectionTitle: section.title });
    }
  }
  return all;
}

// 获取所有分区信息（不含 items）
function getAllSections() {
  return contentDatabase.sections.map(s => ({
    id: s.id,
    title: s.title,
    keywords: s.keywords
  }));
}

// 导出接口（兼容 ES Module 和 CommonJS）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    contentDatabase,
    searchByKeyword,
    filterByTag,
    getSectionItems,
    getAllItems,
    getAllSections
  };
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    return {
      contentDatabase,
      searchByKeyword,
      filterByTag,
      getSectionItems,
      getAllItems,
      getAllSections
    };
  });
}