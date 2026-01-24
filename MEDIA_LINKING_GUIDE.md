# Media Linking Guide

## Overview

You can link media files (images/videos) to specific projects or experiences in your CV. This creates a connection between your media gallery and your work history.

## Structure

Add a `media` array to your `cv.json` file. Each media item can link to a project or experience:

```json
{
  "media": [
    {
      "path": "/media/screenshots/project1.jpg",
      "type": "image",
      "project": "Junior Full Stack Developer",
      "caption": "Dashboard screenshot"
    },
    {
      "path": "/media/videos/demo.mp4",
      "type": "video",
      "project": "Junior Full Stack Developer",
      "caption": "Application demo"
    },
    {
      "path": "/media/screenshots/workflow.jpg",
      "type": "image",
      "experience": "Master Data Controller",
      "caption": "Data workflow visualization"
    }
  ]
}
```

## Fields

### Required
- **`path`**: Path to the media file (e.g., `/media/screenshots/image.jpg`)
- **`type`**: Either `"image"` or `"video"` (auto-detected from extension if omitted)

### Optional Linking
- **`project`**: Title of the project to link to (must match exactly with a project title in your `projects` array)
- **`experience`**: Title of the experience to link to (must match exactly with an experience title in your `experience` array)
- **`caption`**: Description/caption for the media

### Notes
- You can link to either a **project** OR an **experience**, not both
- The title must match **exactly** with the title in your projects/experience array
- If no link is specified, the media will appear in the general gallery only

## Examples

### Link to a Project
```json
{
  "path": "/media/screenshots/my-app.jpg",
  "type": "image",
  "project": "Task Management App",
  "caption": "Main dashboard view"
}
```

### Link to an Experience
```json
{
  "path": "/media/videos/training-demo.mp4",
  "type": "video",
  "experience": "Extended Reality Developer",
  "caption": "XR training simulation demo"
}
```

### Unlinked Media (General Gallery)
```json
{
  "path": "/media/screenshots/general.jpg",
  "type": "image",
  "caption": "General portfolio image"
}
```

## How It Works

1. **Media Gallery**: Shows all media with badges indicating what they're linked to
2. **Project Cards**: Show preview thumbnails of linked media
3. **Modal View**: Displays the linked project/experience when viewing media

## Tips

- Use descriptive captions to help viewers understand the context
- Link screenshots/videos to the relevant projects for better organization
- Keep file paths consistent (use `/media/screenshots/` for project images)
- The type field is optional - it's auto-detected from file extension
