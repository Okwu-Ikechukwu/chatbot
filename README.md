# Student FAQ Chatbot System

A frontend-only student FAQ chatbot system built with HTML, CSS, and JavaScript. No backend services, APIs, or databases required.

## Features

✨ **Smart Matching Algorithm**

- Fuzzy string matching for flexible question recognition
- Keyword-based search across 24+ FAQ topics
- Similarity scoring for best match selection

🔒 **Security (STRIDE Model)**

- Input validation and sanitization
- XSS prevention through HTML escaping
- DoS protection with input length limits
- No sensitive data exposure

🎨 **User-Friendly Interface**

- Modern, responsive design
- Animated messages with typing indicators
- Suggested question buttons
- Auto-scrolling chat view
- Mobile-friendly layout

📚 **Comprehensive FAQ Database**

- Admissions & Registration (4 FAQs)
- Academic Programs (4 FAQs)
- Tuition & Financial Aid (4 FAQs)
- Campus Life & Services (5 FAQs)
- Technical & IT Support (3 FAQs)
- General Policies & Procedures (4 FAQs)

## File Structure

```
GENAI_Chatbot/
├── index.html      # Main HTML file with chatbot UI
├── styles.css      # CSS styling and animations
├── chatbot.js      # JavaScript logic, FAQ database, security
└── README.md       # This file
```

## Getting Started

### Quick Start

1. Open `index.html` in any modern web browser
2. Start asking student-related questions
3. The chatbot will find the best matching answer from the FAQ database

### No Installation Required

- No backend server needed
- No database required
- No external dependencies
- Just open the HTML file!

## Features Explained

### 1. Smart Question Matching

The chatbot uses a similarity algorithm that:

- Compares user input against FAQ questions and keywords
- Returns the best matching answer
- Works even with slightly different phrasing
- Handles typos gracefully

Examples of questions it understands:

- "How do I apply?" → Matches "How do I apply for admission?"
- "What's the tuition?" → Matches "What is the tuition cost?"
- "Tell me about scholarships" → Matches "What types of scholarships are available?"

### 2. Security Implementation

**STRIDE Threat Modeling:**

| Threat                     | Mitigation                             |
| -------------------------- | -------------------------------------- |
| **Spoofing**               | N/A - Client-side only                 |
| **Tampering**              | Input sanitization, HTML escaping      |
| **Repudiation**            | N/A - No backend logging               |
| **Information Disclosure** | No sensitive data, pre-configured FAQs |
| **Denial of Service**      | Input length limits (500 chars)        |
| **Elevation of Privilege** | N/A - No user roles                    |

**Security Features:**

- `InputSanitizer` class removes dangerous characters
- Prevents XSS attacks via HTML escaping
- Blocks JavaScript protocol and event handlers
- Limits input length to prevent buffer overflow

### 3. FAQ Categories

**Admissions & Registration**

- How to apply for admission
- Required documents
- Application deadlines
- International student process

**Academic Programs**

- Available degree programs
- Major changes
- Class sizes
- Online learning options

**Tuition & Financial Aid**

- Tuition costs
- Financial aid options
- FAFSA application
- Scholarship types

**Campus Life & Services**

- On-campus housing
- Meal plans
- Health services
- Student activities
- Library facilities

**Technical & IT Support**

- IT help resources
- WiFi connectivity
- Free software access

**Policies & Procedures**

- Academic standing requirements
- Class withdrawal/drop policy
- Official transcript requests
- Honors and Dean's List criteria

## How the Chatbot Works

### Algorithm Flow

```
User Input
    ↓
Input Validation & Sanitization
    ↓
Similarity Comparison
    ├─ Compare with FAQ questions (40% weight)
    ├─ Compare with FAQ keywords (60% weight)
    └─ Calculate combined score
    ↓
Best Match Selection
    ├─ Match found (score > 0.3) → Return Answer
    └─ No match → Return "Not sure" message
    ↓
Display Response with Typing Indicator
```

### Confidence Scoring

- **Minimum threshold**: 0.3 (30% similarity)
- **Question comparison**: 40% weight
- **Keyword comparison**: 60% weight
- Returns best match above threshold

## Customization Guide

### Adding New FAQs

Edit `chatbot.js` and add to the `faqDatabase` array:

```javascript
{
    id: 25,
    category: "Your Category",
    keywords: ["keyword1", "keyword2", "keyword3"],
    question: "Your full question?",
    answer: "Your detailed answer here.\nWith multiple lines if needed."
}
```

### Styling Customization

Modify colors in `styles.css`:

```css
/* Primary gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Adjust these for your brand colors */
```

### Changing FAQ Database Source

Currently: Embedded in `chatbot.js`
To use external JSON:

```javascript
// Add this to chatbot.js
fetch("faqs.json")
  .then((res) => res.json())
  .then((data) => (faqDatabase = data));
```

## Browser Compatibility

Works on:

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Performance

- **Loading time**: < 500ms
- **Message response**: 800ms (with typing indicator)
- **Memory usage**: ~2MB
- **No external libraries** - Pure vanilla JavaScript

## Accessibility

- Semantic HTML structure
- Keyboard navigation support (Enter to send)
- Color contrast meets WCAG standards
- Readable font sizes
- Focus indicators on buttons

## Testing the Chatbot

### Test Cases

**Valid Matches:**

- Input: "How do I get admitted?"
- Expected: Admission application answer

**Keyword Match:**

- Input: "What about scholarships?"
- Expected: Scholarship types answer

**No Match:**

- Input: "What's the weather?"
- Expected: "I'm not sure" message

**Security Tests:**

- Input: `<script>alert('xss')</script>`
- Expected: Sanitized, safe display

## Troubleshooting

### Chatbot not responding

- Check browser console for JavaScript errors
- Ensure all HTML, CSS, and JS files are in the same directory
- Try a different browser

### Styling looks off

- Clear browser cache (Ctrl+Shift+Del)
- Verify styles.css is linked in index.html
- Check file paths

### Questions not matching

- Check exact keywords in chatbot.js FAQ database
- Try simpler search terms
- Review similarity algorithm threshold

## FAQ Enhancement Ideas

Future improvements could include:

- Rating system (helpful/not helpful)
- Search history
- Multi-language support
- User feedback collection
- Analytics tracking
- Integration with student portal
- Live human agent escalation button
- Conversation logging (with privacy consent)

## File Descriptions

### index.html

- Semantic HTML structure
- Chat messages container
- Input field and send button
- Suggested questions section
- Responsive layout

### styles.css

- Modern gradient design
- Responsive grid layout
- Animation effects (fade-in, bounce)
- Mobile breakpoints
- Custom scrollbar styling

### chatbot.js

- FAQ database (24 questions)
- InputSanitizer class (security)
- ChatBot class (matching logic)
- DOM event handlers
- Conversation history tracking

## License

Free to use and modify for educational purposes.

## Support

For questions or issues:

1. Check FAQ in the chatbot itself
2. Review this README
3. Check browser console for errors
4. Verify all files are in correct location

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Security Model**: STRIDE  
**No Backend Required** ✅
