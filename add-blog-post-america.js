const fs = require('fs')
const path = require('path')

const postsPath = path.join(__dirname, 'src/data/posts.json')
const htmlPath = path.join(__dirname, 'blog-post-america-no-superstar.html')

const content = fs.readFileSync(htmlPath, 'utf8')
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'))

const newPost = {
  id: 100002,
  title: "Why Has America Never Produced a Male Soccer Superstar? The Answer Might Surprise You",
  slug: "why-america-never-produced-male-soccer-superstar-world-cup-2026",
  date: "Fri, 13 Jun 2026 10:00:00 +0000",
  content,
  excerpt: "The 2026 World Cup is here. Billions of eyes are on the beautiful game. And the most powerful sporting nation on Earth still can't answer one burning question: why hasn't America produced a single male soccer superstar? The answer is more cultural, more systemic, and more fascinating than you might think.",
  categories: ["Blog", "Soccer Culture", "Parent Guide", "Youth Soccer"],
  tags: ["world cup 2026", "american soccer", "soccer culture", "youth development", "pay to play", "christian pulisic", "youth soccer cost", "parent guide"],
  featuredImage: "https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1781347672156-2hs1pv.png",
  thumbnailId: ""
}

// Check for duplicate slug
if (posts.find(p => p.slug === newPost.slug)) {
  console.log('Post with this slug already exists — updating it.')
  const idx = posts.findIndex(p => p.slug === newPost.slug)
  posts[idx] = newPost
} else {
  posts.unshift(newPost) // add to the front so it shows as newest
  console.log(`Added new post: "${newPost.title}"`)
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2))
console.log(`posts.json updated. Total posts: ${posts.length}`)
