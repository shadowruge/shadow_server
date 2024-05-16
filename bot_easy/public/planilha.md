**Posts sheet**
| Post ID | Post Title | Post Content | Status |
| --- | --- | --- | --- |
| 1 | Post 1 | This is post 1 | Draft |
| 2 | Post 2 | This is post 2 | Published |

**Reels sheet**
| Reel ID | Reel Title | Reel Content | Status |
| --- | --- | --- | --- |
| 1 | Reel 1 | This is reel 1 | Draft |
| 2 | Reel 2 | This is reel 2 | Published |

**Buttons sheet**
| Button ID | Button Text | Button Action |
| --- | --- | --- |
| 1 | Create Post | =HYPERLINK("https://example.com/create-post") |
| 2 | Create Reel | =HYPERLINK("https://example.com/create-reel") |
| 3 | Update Status | =HYPERLINK("https://example.com/update-status") |
| 4 | Delete Post/Reel | =HYPERLINK("https://example.com/delete-post-reel") |

**Button script**

```javascript
function createPost() {
  // Create a new post and update the Posts sheet
}

function createReel() {
  // Create a new reel and update the Reels sheet
}

function updateStatus() {
  // Update the status of a post or reel
}

function deletePostReel() {
  // Delete a post or reel
}
```
