async function perfume() {
  const { initPerfume } = await import('perfume.js');

  initPerfume({
    analyticsTracker: (options) => {
      const { attribution, metricName, data, rating } = options;

      switch (metricName) {
        case 'navigationTiming':
          if (data && data.timeToFirstByte) {
            console.log('navigationTiming', data);
          }
          break;
        case 'networkInformation':
          if (data && data.effectiveType) {
            console.log('networkInformation', data);
          }
          break;
        case 'storageEstimate':
          console.log('storageEstimate', data);
          break;
        case 'TTFB':
          console.log('timeToFirstByte', { duration: data });
          break;
        case 'RT':
          console.log('redirectTime', { duration: data });
          break;
        case 'FCP':
          console.log('firstContentfulPaint', { duration: data });
          break;
        case 'FID':
          console.log('firstInputDelay', { duration: data });
          break;
        case 'LCP':
          console.log('largestContentfulPaint', { duration: data });
          break;
        case 'CLS':
          console.log('cumulativeLayoutShift', { value: data });
          break;
        case 'INP':
          console.log('interactionToNextPaint', { value: data });
          break;
        case 'TBT':
          console.log('totalBlockingTime', { duration: data });
          break;
        case 'elPageTitle':
          console.log('elementTimingPageTitle', { duration: data });
          break;
        case 'userJourneyStep':
          console.log('userJourneyStep', {
            duration: data,
            stepName: attribution.step_name,
            vitals_score: rating,
          });
          break;
        default:
          console.log(metricName, { duration: data });
          break;
      }
    },
  });
}

export default perfume;
