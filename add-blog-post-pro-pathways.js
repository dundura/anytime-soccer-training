const fs = require('fs')
const path = require('path')

const postsPath = path.join(__dirname, 'src/data/posts.json')
const htmlPath = path.join(__dirname, 'blog-post-pro-pathways.html')

const content = fs.readFileSync(htmlPath, 'utf8')
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'))

const maxId = posts.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0)

const newPost = {
  id: maxId + 1,
  title: "Your Kid Didn't Make a Pro Academy. Now What? A Parent's Guide to MLS NEXT, USL Academy, UPSL, NPSL, and USL League Two",
  slug: "usl-academy-upsl-npsl-usl-league-two-parent-guide",
  date: "Wed, 12 Aug 2026 10:00:00 +0000",
  content,
  excerpt: "If your 16-year-old isn't in an MLS academy, it can feel like the door to professional soccer just closed. It hasn't — and the biggest misunderstanding is that MLS NEXT is closed too, when only about 30 of its ~150 clubs are MLS academies. Here's the complete pathway: pro academies, MLS NEXT, USL Academy, UPSL, NPSL, and USL League Two — who plays, when the season runs, what it really costs, and exactly how each affects NCAA eligibility.",
  categories: ["Blog", "Parent Guide", "College Recruiting", "Youth Soccer"],
  tags: [
    "MLS NEXT",
    "MLS academy",
    "MLS NEXT Pro",
    "pro academy",
    "USL Academy",
    "UPSL",
    "NPSL",
    "USL League Two",
    "player pathways",
    "NCAA eligibility",
    "Homegrown contract",
    "college soccer",
    "pro soccer pathway",
    "youth development",
    "parent guide",
  ],
  featuredImage: "https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1786564454426-0ct6pc.png",
  thumbnailId: "",
}

if (posts.find((p) => p.slug === newPost.slug)) {
  const idx = posts.findIndex((p) => p.slug === newPost.slug)
  posts[idx] = { ...newPost, id: posts[idx].id }
  console.log('Post with this slug already existed — updated it.')
} else {
  posts.unshift(newPost)
  console.log(`Added new post: "${newPost.title}" (id ${newPost.id})`)
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2))
console.log(`posts.json updated. Total posts: ${posts.length}. Slug: /blog/${newPost.slug}`)
