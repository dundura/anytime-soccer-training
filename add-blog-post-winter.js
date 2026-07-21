const fs = require('fs')
const path = require('path')

const postsPath = path.join(__dirname, 'src/data/posts.json')
const htmlPath = path.join(__dirname, 'blog-post-winter-training.html')

const content = fs.readFileSync(htmlPath, 'utf8')
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'))

const maxId = posts.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0)

const newPost = {
  id: maxId + 1,
  title: "How Is Everyone Managing Soccer Practice in the Winter? What Hundreds of Parents Actually Do",
  slug: "how-to-practice-soccer-in-the-winter-cold-weather-training-at-home",
  date: "Mon, 20 Jul 2026 10:00:00 +0000",
  content,
  excerpt: "When the fields freeze and it's dark by dinnertime, how do serious soccer families keep training? We read hundreds of parent replies and rounded up what actually works — futsal, indoor gyms, a wall and a soft ball, and follow-along video training — plus the free resources to turn a small indoor space into your child's biggest development leap.",
  categories: ["Blog", "Parent Guide", "Youth Soccer", "At-Home Training"],
  tags: ["winter soccer training", "indoor soccer", "futsal", "at-home training", "ball mastery", "cold weather training", "soccer touches", "youth development", "parent guide"],
  featuredImage: "",
  thumbnailId: ""
}

if (posts.find(p => p.slug === newPost.slug)) {
  const idx = posts.findIndex(p => p.slug === newPost.slug)
  posts[idx] = { ...newPost, id: posts[idx].id }
  console.log('Post with this slug already existed — updated it.')
} else {
  posts.unshift(newPost)
  console.log(`Added new post: "${newPost.title}" (id ${newPost.id})`)
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2))
console.log(`posts.json updated. Total posts: ${posts.length}. Slug: /blog/${newPost.slug}`)
