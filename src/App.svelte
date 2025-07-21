<script>
  import ProgressBar from './lib/components/ProgressBar.svelte';
  import SectionObserver from './lib/components/SectionObserver.svelte';
  import SarahMichaelViz from './lib/components/visualizations/SarahMichaelViz.svelte';
  import EqualWorkViz from './lib/components/visualizations/EqualWorkViz.svelte';
  import EducationViz from './lib/components/visualizations/EducationViz.svelte';
  import OccupationViz from './lib/components/visualizations/OccupationViz.svelte';
  import GeographyViz from './lib/components/visualizations/GeographyViz.svelte';
  import LivingWageViz from './lib/components/visualizations/LivingWageViz.svelte';
  import GenderViz from './lib/components/visualizations/GenderViz.svelte';
</script>

<ProgressBar />

<SectionObserver sectionNumber={1}>
  <div class="section-content centered-section">
    <div class="centered-text">
      <h1 class="fade-in">When Merit Meets Reality</h1>
      <p class="subtitle fade-in">The persistent wage gap that exists even when qualifications, experience, and performance are identical</p>
      <p class="story-text fade-in">Drawing from comprehensive employment data collected by the Black Wealth Data Center across thousands of counties and workers, this analysis reveals systematic patterns of wage inequality that persist regardless of education, occupation, or geography.</p>
    </div>
  </div>
</SectionObserver>

<SectionObserver sectionNumber={2}>
  <div class="section-content">
    <div class="text-content">
      <h2 class="fade-in">Meet Sarah and Michael</h2>
      <p class="story-text fade-in">Both are 28 years old. Both have bachelor's degrees in business administration from respected universities. Both work as financial analysts in the same metropolitan area with identical job responsibilities. Both have three years of professional experience and similar performance evaluations.</p>
      <p class="story-text fade-in">Sarah is Black. Michael is white.</p>
      <p class="story-text fade-in">Despite identical qualifications and performance, Michael earns <span class="highlight-stat">$17,000 more</span> per year than Sarah.</p>
    </div>
    <div class="viz-content">
      <SarahMichaelViz />
    </div>
  </div>
</SectionObserver>

<SectionObserver sectionNumber={3}>
  <div class="section-content">
    <div class="text-content">
      <h2 class="fade-in">Equal Work, Unequal Pay</h2>
      <p class="story-text fade-in">Meet Marcus and Brad. Both are construction workers with 5 years of experience. Both work 40 hours a week. Both have the same supervisor ratings. But their paychecks tell a different story.</p>
      <div class="data-point fade-in">
        <p class="story-text">This isn't an isolated case. Across industries, Black workers earn systematically less than their white counterparts for performing identical work. The gap persists even when controlling for education, experience, and performance metrics.</p>
      </div>
    </div>
    <div class="viz-content">
      <EqualWorkViz />
    </div>
  </div>
</SectionObserver>

<SectionObserver sectionNumber={4}>
  <div class="section-content">
    <div class="viz-content">
      <EducationViz />
    </div>
    <div class="text-content">
      <h2 class="fade-in">The Broken Promise of Education</h2>
      <p class="story-text fade-in">For generations, education has been proclaimed as the great equalizer—the pathway that would level economic playing fields regardless of background. The data reveals a more complex reality.</p>
      <div class="data-point fade-in">
        <p class="story-text">A white man with only a high school diploma earns <span class="highlight-stat">$78,000</span> on average annually.</p>
      </div>
      <div class="data-point fade-in">
        <p class="story-text">A Black woman with a bachelor's degree earns <span class="highlight-stat">$65,000</span> on average annually.</p>
      </div>
    </div>
  </div>
</SectionObserver>

<SectionObserver sectionNumber={5}>
  <div class="section-content">
    <div class="viz-content">
      <OccupationViz />
    </div>
    <div class="text-content">
      <h2 class="fade-in">The Invisible Hand of Sorting</h2>
      <p class="story-text fade-in">It's not coincidence that determines who ends up where in the job market. Systemic barriers, network effects, and historical discrimination create patterns that persist across generations.</p>
      <div class="insight-box fade-in">
        <p class="insight-text">Landscaping & Groundskeeping: 29.8% Black workers, median wage $35,000</p>
        <p class="insight-text">Software Development: 8.9% Black workers, median wage $95,000</p>
      </div>
    </div>
  </div>
</SectionObserver>

<SectionObserver sectionNumber={6}>
  <div class="section-content">
    <div class="viz-content">
      <GeographyViz />
    </div>
    <div class="text-content">
      <h2 class="fade-in">The Map of Opportunity</h2>
      <p class="story-text fade-in">Even within the same state, counties with similar Black populations show dramatically different median incomes. Your zip code becomes a predictor of your economic potential.</p>
    </div>
  </div>
</SectionObserver>

<SectionObserver sectionNumber={7}>
  <div class="section-content">
    <div class="viz-content">
      <LivingWageViz />
    </div>
    <div class="text-content">
      <h2 class="fade-in">When Full-Time Employment Fails to Provide Economic Security</h2>
      <p class="story-text fade-in">The wage gap transcends questions of fairness—it fundamentally undermines economic survival. In communities with substantial Black populations, median wages consistently fall short of local living wage requirements.</p>
      <div class="data-point fade-in">
        <p class="story-text">In 52% of counties where Black Americans constitute more than 25% of the population, average weekly wages fall within the bottom quartile relative to local cost of living calculations.</p>
      </div>
    </div>
  </div>
</SectionObserver>

<SectionObserver sectionNumber={8}>
  <div class="section-content">
    <div class="viz-content">
      <GenderViz />
    </div>
    <div class="text-content">
      <h2 class="fade-in">The Intersection of Race and Gender</h2>
      <p class="story-text fade-in">For Black women, wage inequality operates through intersectional mechanisms—simultaneous penalties applied for both racial and gender identity that compound into deeper economic disadvantage.</p>
      <div class="data-point fade-in">
        <p class="story-text">For every dollar earned by white men, Black women receive <span class="highlight-stat">63 cents</span> for equivalent work.</p>
      </div>
    </div>
  </div>
</SectionObserver>

<SectionObserver sectionNumber={9}>
  <div class="section-content centered-section">
    <div class="centered-text">
      <h2 class="fade-in">Evidence-Based Pathways to Change</h2>
      <p class="story-text fade-in">Equal work deserves equal compensation. The mechanisms for creating change exist and have demonstrated measurable impact when implemented systematically.</p>
      
      <div class="solutions-grid fade-in">
        <div class="solution-card">
          <div class="solution-impact">9%</div>
          <div class="solution-title">Salary Transparency</div>
          <div class="solution-description">Companies that publish compensation ranges see racial wage gaps decrease by 9% within two years of implementation.</div>
        </div>
        
        <div class="solution-card">
          <div class="solution-impact">16%</div>
          <div class="solution-title">Bias Audits</div>
          <div class="solution-description">Organizations conducting regular equity audits achieve 16% more diverse leadership within three years.</div>
        </div>
        
        <div class="solution-card">
          <div class="solution-impact">29%</div>
          <div class="solution-title">Structured Interviews</div>
          <div class="solution-description">Standardized evaluation processes reduce discriminatory hiring by 29% compared to unstructured conversations.</div>
        </div>
        
        <div class="solution-card">
          <div class="solution-impact">12%</div>
          <div class="solution-title">Pay Equity Analysis</div>
          <div class="solution-description">Regular compensation analysis and correction reduces wage gaps by 12% annually when implemented consistently.</div>
        </div>
      </div>
      
      <div class="insight-box fade-in">
        <p class="insight-text">Wage inequality isn't inevitable—it results from institutional choices in policy, hiring practices, and compensation structures. Different choices will produce different outcomes.</p>
      </div>
    </div>
  </div>
</SectionObserver>