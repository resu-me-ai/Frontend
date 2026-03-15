import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '@/utils/sanitize';

describe('HTML Sanitization', () => {
  it('should remove script tags', () => {
    const dirty = '<p>Hello</p><script>alert("xss")</script>';
    const clean = sanitizeHtml(dirty);

    expect(clean).toBe('<p>Hello</p>');
    expect(clean).not.toContain('script');
  });

  it('should remove event handlers', () => {
    const dirty = '<img src="x" onerror="alert(1)">';
    const clean = sanitizeHtml(dirty);

    expect(clean).not.toContain('onerror');
  });

  it('should remove javascript: URLs', () => {
    const dirty = '<a href="javascript:alert(1)">Click</a>';
    const clean = sanitizeHtml(dirty);

    expect(clean).not.toContain('javascript:');
  });

  it('should preserve safe HTML', () => {
    const safe = '<p><strong>Bold</strong> and <em>italic</em></p>';
    const clean = sanitizeHtml(safe);

    expect(clean).toBe(safe);
  });

  it('should handle empty strings', () => {
    expect(sanitizeHtml('')).toBe('');
  });

  it('should handle undefined/null gracefully', () => {
    expect(sanitizeHtml(undefined as unknown as string)).toBe('');
    expect(sanitizeHtml(null as unknown as string)).toBe('');
  });
});
