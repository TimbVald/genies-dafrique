# Data Services

This folder contains data access functions that provide a clean abstraction layer between components and data sources.

## Architecture

```
Components
    ↓
Data Services (this folder)
    ↓
Data Sources (local files → eventually Supabase)
```

## Service Functions (to be implemented)

### Site
- `getSiteInfo()` - Get global site information
- `getContactInfo()` - Get contact details

### Home
- `getHomeHero()` - Get hero section data
- `getHomeHighlights()` - Get featured content

### About
- `getAboutHistory()` - Get timeline data
- `getAboutMission()` - Get mission/vision/values
- `getAboutTeam()` - Get team members

### Programs
- `getPrograms()` - Get all educational programs
- `getProgramBySlug(slug)` - Get specific program

### Admissions
- `getAdmissionsInfo()` - Get admission requirements
- `getTuitionFees()` - Get fee structure

### News
- `getNews()` - Get all published news
- `getNewsBySlug(slug)` - Get specific news article
- `getNewsByCategory(category)` - Get news by category

### Events
- `getEvents()` - Get all events
- `getEventBySlug(slug)` - Get specific event
- `getEventsByDateRange(start, end)` - Get events in date range

### Gallery
- `getGallery()` - Get gallery items
- `getGalleryAlbum(albumId)` - Get specific album

### Documents
- `getDocuments()` - Get all documents
- `getDocumentBySlug(slug)` - Get specific document

### FAQ
- `getFAQ()` - Get all FAQ items
- `getFAQByCategory(category)` - Get FAQ by category

### Team
- `getTeamMembers()` - Get all team members
- `getTeamMemberBySlug(slug)` - Get specific member

### Testimonials
- `getTestimonials()` - Get all testimonials
- `getFeaturedTestimonials()` - Get featured testimonials

## Implementation Notes

- All functions should return typed data using the types from `@/types`
- Functions should be source-agnostic (work with local data or future Supabase)
- Include proper error handling
- Support filtering, pagination where appropriate
