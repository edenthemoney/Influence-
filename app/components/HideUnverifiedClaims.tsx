'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { hideCopy, scrubCopy } from '@/data/partners';

const SKIP = [/^\/admin/, /^\/outreach/, /^\/terms/, /^\/privacy/, /^\/proposal/, /^\/api/];

function ownText(el: HTMLElement) {
  let text = '';
  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) text += node.textContent || '';
  });
  return text.replace(/\s+/g, ' ').trim();
}

export default function HideUnverifiedClaims() {
  const pathname = usePathname() || '';

  useEffect(() => {
    if (SKIP.some((pattern) => pattern.test(pathname))) return;
    const root = document.body;
    const nodes = root.querySelectorAll('p, span, li, h1, h2, h3, h4, a, div, button');
    nodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.closest('nav, script, style, textarea, input, select')) return;
      if (node.querySelector('img, video, svg, input, textarea')) return;
      if (node.childElementCount > 4) return;
      const raw = node.childElementCount === 0 ? (node.textContent || '').replace(/\s+/g, ' ').trim() : ownText(node);
      const source = raw || (node.childElementCount <= 3 ? (node.innerText || '').replace(/\s+/g, ' ').trim() : '');
      if (!source || source.length > 320) return;
      const next = scrubCopy(source);
      const words = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '');
      const blocked = !next || hideCopy(source) || words(next) !== words(source) || (source.length < 90 && /\b\d[\d.,]*\s*[kKmM]\+?\s*followers?\b/i.test(source));
      if (blocked) {
        node.dataset.claimHidden = '1';
        node.style.setProperty('display', 'none', 'important');
        return;
      }
    });

    for (let pass = 0; pass < 4; pass += 1) {
      root.querySelectorAll('section, div, ul, li').forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.dataset.claimHidden || node.closest('nav, footer')) return;
        if (!node.querySelector('[data-claim-hidden]')) return;
        const leftover = (node.innerText || '').replace(/[·|•✓\s]/g, '');
        if (!leftover) {
          node.dataset.claimHidden = '1';
          node.style.setProperty('display', 'none', 'important');
        }
      });
    }
  }, [pathname]);

  return null;
}
