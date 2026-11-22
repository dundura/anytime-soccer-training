const fs = require('fs')
const path = require('path')

const postsPath = path.join(__dirname, 'src/data/posts.json')
const htmlPath = path.join(__dirname, 'blog-post-soccer-101-triangle.html')

const content = fs.readFileSync(htmlPath, 'utf8')
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'))

const maxId = posts.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0)

const newPost = {
  id: maxId + 1,
  title: "Soccer 101: Getting Started in the Triangle (Raleigh, Durham, Cary & Chapel Hill)",
  slug: "youth-soccer-raleigh-durham-cary-chapel-hill-getting-started-guide",
  date: "Sun, 22 Nov 2026 10:00:00 +0000",
  content,
  excerpt: "Rec, Challenge, Classic, ECNL, MLS NEXT, futsal, ligas, school teams: a parent's guide to every type of youth soccer in the Triangle, with ages, 2026–27 costs, where to play in Raleigh, Durham, Cary and Chapel Hill, and how to pick the right level for your child.",
  categories: ["Blog", "Parent Guide", "Youth Soccer"],
  tags: ["Raleigh youth soccer", "Durham youth soccer", "Cary soccer", "Chapel Hill soccer", "Triangle soccer", "North Carolina youth soccer", "NCYSA", "NCFC Youth", "Triangle United", "rec soccer", "challenge soccer", "club soccer", "futsal", "parent guide"],
  featuredImage: "https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1795367213111-44iaxx.png",
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
