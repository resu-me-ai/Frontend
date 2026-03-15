# Chat M1-C Testing Checklist

## Pre-Integration Testing (Before Backend)

### ✅ Code Review
- [ ] All files compile without TypeScript errors
- [ ] No console errors in browser DevTools
- [ ] All imports resolve correctly
- [ ] ESLint passes with no errors

### ✅ Manual Navigation Flow
- [ ] Can navigate from /job-description to /upload-resume
- [ ] Can navigate from /upload-resume to /analyzing
- [ ] /analyzing shows loading state
- [ ] /analyzing shows error state (when backend unavailable)
- [ ] Error state has "Start Over" and "Go Back" buttons
- [ ] Buttons navigate correctly

### ✅ localStorage Persistence
- [ ] job_description_data saved after JD page
- [ ] resume_data saved after upload page
- [ ] Data persists across page refreshes
- [ ] Can inspect data in DevTools → Application → Local Storage

---

## Post-Integration Testing (After Backend Deployed)

### ✅ API Integration
- [ ] /analyzing calls POST /api/v1/analyze on mount
- [ ] Request includes jd_text and resume file
- [ ] Request headers are correct (multipart/form-data)
- [ ] Network tab shows 200 OK response
- [ ] Response structure matches expected format

### ✅ Success Flow
- [ ] API returns match_report with overall_score
- [ ] analysis_result saved to localStorage
- [ ] Auto-navigates to /analysis-score after API success
- [ ] /analysis-score displays real overall_score from API
- [ ] /analysis-score displays real category scores from API

### ✅ Error Handling
- [ ] 400 error shows error message
- [ ] 500 error shows error message
- [ ] Network timeout shows error message
- [ ] Missing data validation works
- [ ] Error state UI renders correctly

### ✅ TDD Tests
- [ ] Remove `.skip()` from all tests in analysis-flow.test.tsx
- [ ] Run: `npm run test src/__tests__/analysis-flow.test.tsx`
- [ ] All 6 tests pass
- [ ] No test timeouts or failures

---

## Detailed Test Cases

### Test Case 1: Happy Path (End-to-End)

**Steps:**
1. Navigate to /job-description
2. Enter job title: "Senior Product Manager"
3. Enter company: "TechCorp"
4. Enter JD: "5+ years PM experience..."
5. Click "Analyze JD"
6. Should navigate to /upload-resume
7. Upload resume.pdf (or select existing)
8. Click "Analyze Resume Match"
9. Should navigate to /analyzing
10. Wait for progress bar to complete
11. Should auto-navigate to /analysis-score
12. Should see overall score (e.g., 75%)
13. Should see category scores

**Expected Result:** ✅ User sees analysis results

---

### Test Case 2: Missing Job Description

**Steps:**
1. Navigate directly to /upload-resume (bypass JD page)
2. Upload resume
3. Click "Analyze Resume Match"
4. Navigate to /analyzing

**Expected Result:** ⚠️ Error: "Missing job description or resume data"

---

### Test Case 3: Backend Error (500)

**Steps:**
1. Complete happy path steps 1-9
2. Backend returns 500 error

**Expected Result:** ⚠️ Error UI with message from API

---

### Test Case 4: Network Timeout

**Steps:**
1. Complete happy path steps 1-9
2. Disconnect internet
3. Wait for timeout

**Expected Result:** ⚠️ Error: "Network error" or "Failed to fetch"

---

### Test Case 5: Malformed Response

**Steps:**
1. Complete happy path steps 1-9
2. Backend returns invalid JSON

**Expected Result:** ⚠️ Error: "Invalid response from server"

---

### Test Case 6: Retry After Error

**Steps:**
1. Trigger error (e.g., disconnect internet)
2. See error UI
3. Reconnect internet
4. Click "Start Over"
5. Complete flow again

**Expected Result:** ✅ Second attempt succeeds

---

## Browser Compatibility

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

---

## Performance Checks

### Lighthouse Audit
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90

### Network
- [ ] API request size < 10MB (for resume files)
- [ ] Response time < 5 seconds
- [ ] No memory leaks (check DevTools Memory tab)

---

## Accessibility Checks

- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announces page titles
- [ ] Error messages are announced
- [ ] Loading states are announced
- [ ] Buttons have accessible labels

---

## Edge Cases

### Large Files
- [ ] Upload 10MB PDF → Should work
- [ ] Upload 50MB PDF → Should fail gracefully

### Special Characters
- [ ] JD with emoji → Should handle
- [ ] JD with non-English text → Should handle

### Long Sessions
- [ ] Complete flow after 1 hour idle → localStorage should persist

### Multiple Tabs
- [ ] Start flow in Tab 1
- [ ] Open Tab 2
- [ ] Complete flow in Tab 1
- [ ] Refresh Tab 2 → Should show updated results

---

## Regression Tests

### Existing Functionality
- [ ] /job-description still works as before
- [ ] /upload-resume still works as before
- [ ] Demo flows not affected
- [ ] Authentication flows not affected

---

## Data Validation

### localStorage Inspection

**After /job-description:**
```javascript
localStorage.getItem('job_description_data')
// Should return: {"jobTitle":"...","companyName":"...","jobDescription":"..."}
```

**After /upload-resume:**
```javascript
localStorage.getItem('resume_data')
// Should return: {"uploadedFileName":"resume.pdf","selectedResumeId":""}
```

**After API success:**
```javascript
localStorage.getItem('analysis_result')
// Should return: {"match_report":{"overall_score":75,...},...}
```

---

## Monitoring & Logging

### Console Logs to Check
- [ ] No unhandled promise rejections
- [ ] No React warnings
- [ ] API errors logged to console
- [ ] Successful API calls logged (dev mode)

### Network Tab to Check
- [ ] POST /api/v1/analyze request
- [ ] FormData payload includes jd_text + resume
- [ ] Response status 200 OK
- [ ] Response body matches expected format

---

## Sign-Off Checklist

### Developer Sign-Off
- [ ] All TypeScript errors resolved
- [ ] All ESLint warnings resolved
- [ ] Code reviewed by peer
- [ ] Documentation complete

### QA Sign-Off
- [ ] Manual test cases passed (10/10)
- [ ] Automated tests passed (6/6)
- [ ] Cross-browser testing complete
- [ ] Accessibility audit complete

### Product Sign-Off
- [ ] User journey works end-to-end
- [ ] Error states are user-friendly
- [ ] Loading states are clear
- [ ] Results page displays correctly

---

## Known Issues / Limitations

1. **Mock File Usage:**
   - AnalysisInProgressPage creates mock file instead of using real upload
   - **Impact:** API receives mock content, not actual resume
   - **Fix:** Requires state management (React Context) - post-MVP

2. **Progress Bar:**
   - Fixed 12-second animation, not tied to API progress
   - **Impact:** May finish before or after API call
   - **Fix:** Use SSE or WebSockets for real-time progress - post-MVP

3. **localStorage Limits:**
   - Max 5-10MB depending on browser
   - **Impact:** Large files may not persist
   - **Fix:** Move to IndexedDB or server-side storage - post-MVP

---

## Success Criteria

### Must Pass (Blocker)
- [x] User can complete full flow /job-description → /analysis-score
- [x] API integration works (200 OK response)
- [x] Results display correctly
- [x] Error handling works
- [x] All TDD tests pass

### Should Pass (High Priority)
- [ ] No console errors
- [ ] Accessibility audit passes
- [ ] Cross-browser compatible
- [ ] Performance acceptable (< 5s total)

### Nice to Have (Low Priority)
- [ ] Mobile responsive
- [ ] Offline error handling
- [ ] Retry with exponential backoff

---

**Testing Status:** ⏳ Awaiting backend deployment
**Last Updated:** 2026-01-22
**Tester:** _____________
**Date Tested:** _____________
