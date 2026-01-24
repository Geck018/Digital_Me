# Project Status & Categorization Guide

## Professional Best Practices

### ✅ Recommended Approach

**Show completed projects prominently** - These demonstrate your ability to deliver.

**Separate personal/side projects** - Shows initiative and passion beyond work.

**Handle cancelled projects carefully** - Frame them as learning experiences or pivot points, not failures.

### 📋 Status Options

Add a `status` field to each project in your `cv.json`:

```json
{
  "projects": [
    {
      "title": "Completed Project",
      "status": "completed",  // Default - can be omitted
      "description": "...",
      "technologies": [...]
    },
    {
      "title": "Personal Side Project",
      "status": "personal",
      "description": "...",
      "technologies": [...]
    },
    {
      "title": "Work in Progress",
      "status": "in-progress",
      "description": "...",
      "technologies": [...]
    },
    {
      "title": "Cancelled Project",
      "status": "cancelled",
      "reason": "Project was cancelled due to company restructuring, but I learned valuable lessons in [technology/process]",
      "description": "...",
      "technologies": [...]
    }
  ]
}
```

## Status Values

### `completed` (Default)
- Omit this field or set to `"completed"`
- Shows finished, successful projects
- **Best for**: Your strongest work

### `personal` or `side-project`
- Personal projects done in your own time
- Shows initiative and passion
- **Best for**: Demonstrating self-directed learning

### `in-progress` or `in_progress`
- Currently being worked on
- Shows active development
- **Best for**: Recent work, ongoing initiatives

### `cancelled` or `archived`
- Projects that didn't complete
- **Important**: Add a `reason` field to explain context
- Frame positively: "Learned X", "Pivoted to Y", "Company restructuring"
- **Best for**: Showing you worked on real projects, even if they didn't ship

## Professional Tips

### ✅ DO:
- **Emphasize learning**: "Although cancelled, I gained expertise in..."
- **Show impact**: "Delivered X features before project pivot"
- **Be honest but positive**: "Project was deprioritized, but I learned..."
- **Separate personal work**: Shows you code outside of work

### ❌ DON'T:
- Blame others or the company
- Focus on failure
- Include too many cancelled projects (max 1-2)
- Make excuses

## Example: Cancelled Project Done Right

```json
{
  "title": "Internal Tooling Platform",
  "status": "cancelled",
  "reason": "Project was deprioritized due to strategic shift, but I delivered core features and gained expertise in microservices architecture",
  "description": "Developed a comprehensive internal tooling platform with real-time collaboration features...",
  "technologies": ["Node.js", "React", "Docker", "Kubernetes"],
  "links": {
    "github": "https://github.com/username/project"
  }
}
```

## Display Behavior

- **All projects shown by default** with category filters
- **Status badges** appear on project cards
- **Cancelled projects** show the reason field if provided
- **Filtering** allows visitors to focus on what interests them

## Recommendation

For your CV:
1. **Completed work projects** - Show these prominently
2. **Personal projects** - Great for showing initiative
3. **In-progress** - Shows you're actively developing
4. **Cancelled** - Include 1-2 max, with positive framing about what you learned

This approach shows:
- ✅ You can deliver (completed)
- ✅ You're self-motivated (personal)
- ✅ You're actively learning (in-progress)
- ✅ You work on real projects and learn from all experiences (cancelled)
