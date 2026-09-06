const { createApp } = Vue;

createApp({
  data() {
    return {
      event: {
        title: 'Apple Event: Surprise and shine',
        displayDate: 'Wednesday 9 September 2026 · 6:00 pm (UK)',
        description: 'Watch Apple’s special event online.',
        startUtc: '20260909T170000Z',
        endUtc: '20260909T190000Z',
        url: 'https://www.apple.com/apple-events/',
      },
    };
  },
  methods: {
    escapeIcs(value) {
      return String(value)
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;');
    },
    downloadCalendarEvent() {
      const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      const uid = `apple-event-2026-${Date.now()}@add-event-to-calendar`;

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Add Event to Calendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${now}`,
        `DTSTART:${this.event.startUtc}`,
        `DTEND:${this.event.endUtc}`,
        `SUMMARY:${this.escapeIcs(this.event.title)}`,
        `DESCRIPTION:${this.escapeIcs(this.event.description)}`,
        `URL:${this.event.url}`,
        'END:VEVENT',
        'END:VCALENDAR',
      ];

      const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'apple-event-2026.ics';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    },
  },
}).mount('#app');
