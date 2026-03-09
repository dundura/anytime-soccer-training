import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Soccer Training Videos | 100+ YouTube Drills by Age Group',
  description: '100+ curated YouTube soccer training videos organized by age group. Free drills for U6, U8, U10, U12 and advanced players.',
};

const htmlContent = `<style>
/* ===== VIDEO LIBRARY PAGE ===== */
.ast-video-library * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ast-video-library {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Barlow', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #0F3154;
}

.ast-video-library .page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #0F3154 0%, #1a4a7c 100%);
  border-radius: 12px;
  color: white;
}

.ast-video-library .page-header h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(32px, 6vw, 48px);
  letter-spacing: 3px;
  margin-bottom: 10px;
  color: white;
}

.ast-video-library .page-header p {
  font-size: clamp(14px, 2vw, 18px);
  opacity: 0.9;
  color: white;
}

.ast-video-library .section {
  margin-bottom: 40px;
}

.ast-video-library .section-header {
  background: #0F3154;
  color: white;
  padding: 15px 20px;
  border-radius: 8px 8px 0 0;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(20px, 3vw, 26px);
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.ast-video-library .section-header .count {
  background: #DC373E;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 14px;
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
}

.ast-video-library .video-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 4px 15px rgba(15,49,84,0.1);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}

.ast-video-library .video-table th {
  background: #ECF1F7;
  padding: 12px 15px;
  text-align: left;
  font-weight: 700;
  font-size: 13px;
  color: #0F3154;
  border-bottom: 2px solid #0F3154;
}

.ast-video-library .video-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.ast-video-library .video-table tr:hover {
  background: #f8fafc;
}

.ast-video-library .video-table .num {
  width: 40px;
  text-align: center;
  color: #888;
  font-weight: 600;
}

.ast-video-library .video-table .skill {
  font-weight: 600;
  color: #0F3154;
}

.ast-video-library .video-table .type {
  color: #666;
  font-size: 13px;
}

.ast-video-library .video-table .link a {
  display: inline-block;
  background: #DC373E;
  color: white;
  padding: 6px 14px;
  border-radius: 50px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  transition: background 0.2s;
}

.ast-video-library .video-table .link a:hover {
  background: #b8303a;
}

.ast-video-library .toc {
  background: #ECF1F7;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 40px;
}

.ast-video-library .toc h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  letter-spacing: 2px;
  margin-bottom: 15px;
  color: #0F3154;
}

.ast-video-library .toc-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.ast-video-library .toc-links a {
  background: #0F3154;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.2s;
}

.ast-video-library .toc-links a:hover {
  background: #1a4a7c;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .ast-video-library {
    padding: 15px;
  }
  
  .ast-video-library .video-table th,
  .ast-video-library .video-table td {
    padding: 10px 8px;
    font-size: 12px;
  }
  
  .ast-video-library .video-table .type {
    display: none;
  }
  
  .ast-video-library .video-table .link a {
    padding: 5px 10px;
    font-size: 11px;
  }
}
</style>

<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">

<div class="ast-video-library">
  <div class="page-header">
    <h1>⚽ FREE SOCCER TRAINING VIDEOS</h1>
    <p>100+ curated YouTube drills organized by age group. Just click and train!</p>
  </div>
  
  <div class="toc">
    <h3>📋 JUMP TO AGE GROUP</h3>
    <div class="toc-links">
      <a href="#age-u6">AGE: U6</a>
      <a href="#age-u8">AGE: U8</a>
      <a href="#age-u10">AGE: U10</a>
      <a href="#age-u11-u12-and-13plus">AGE: U11, U12 and 13+</a>
      <a href="#useful-sites-for-ideas">Useful sites for IDEAS</a>
    </div>
  </div>

  <div class="section" id="age-u6">
    <div class="section-header">
      AGE: U6
      <span class="count">12 videos</span>
    </div>
    <table class="video-table">
      <thead>
        <tr>
          <th class="num">#</th>
          <th>Skill</th>
          <th class="type">Type</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="num">1</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Games</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=84Zfys6LjhA&list=PLBW2jzybRstf5L_PmL8sT9rD4YPeriMKM" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">2</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=ysR5IeIsQzs&t=54s" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">3</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=RWX00wOLAWQ" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">4</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=yP8-oZRV0QQ" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">5</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=vkAK_69p86s&list=PLBW2jzybRstemQTPGE-EHNkpUpM_uqlQM&index=11" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">6</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=5DvqdF3oVSE" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">7</td>
          <td class="skill">Striking the ball games</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=L1bqfJ29ij8" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">8</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=IJx4Koj0ZrI&list=PL8Yn8g4Hbr07qp-8LgY8DX1-W1Zxa4nVY" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">9</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=IJx4Koj0ZrI&list=PL8Yn8g4Hbr07qp-8LgY8DX1-W1Zxa4nVY" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">10</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=vy3Vp0nVYE4&list=PLA756190883A0FDFF&index=37" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">11</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=07lrS7lcm1E" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">12</td>
          <td class="skill">U6 Pack</td>
          <td class="type">Games</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=84Zfys6LjhA&list=PLBW2jzybRstf5L_PmL8sT9rD4YPeriMKM" target="_blank">▶ Watch</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section" id="age-u8">
    <div class="section-header">
      AGE: U8
      <span class="count">29 videos</span>
    </div>
    <table class="video-table">
      <thead>
        <tr>
          <th class="num">#</th>
          <th>Skill</th>
          <th class="type">Type</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="num">1</td>
          <td class="skill">Ball Control</td>
          <td class="type">Juggling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=tQoVkd0Fyho&list=PLBW2jzybRstemQTPGE-EHNkpUpM_uqlQM&index=25" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">2</td>
          <td class="skill">Ball Control</td>
          <td class="type">Juggling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Nxr9Pev3e_0&list=PLE_XRZxiHafZdcnsm2buwJDVA_0lf_moi" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">3</td>
          <td class="skill">Ball Control</td>
          <td class="type">Juggling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=MBiUt_DRSu0&list=PLE_XRZxiHafZdcnsm2buwJDVA_0lf_moi&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">4</td>
          <td class="skill">Dribbling</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=gt82ixhdaVY&list=PL8Yn8g4Hbr07qp-8LgY8DX1-W1Zxa4nVY&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">5</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=ysR5IeIsQzs&t=54s" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">6</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=RWX00wOLAWQ" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">7</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=yP8-oZRV0QQ" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">8</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=5DvqdF3oVSE" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">9</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=dQvNyCFxuQ4&list=PLBW2jzybRstemQTPGE-EHNkpUpM_uqlQM&index=6" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">10</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=bCbU43tJlQo&list=PLBW2jzybRstemQTPGE-EHNkpUpM_uqlQM&index=18" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">11</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=2MdBVOjYsf8&list=PLBW2jzybRstemQTPGE-EHNkpUpM_uqlQM&index=28" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">12</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=2xtXSunfeDM&list=PLO-zaZol7NeyWH63e-wglsRUfOBoX3u0U" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">13</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=G0Hal8w5Odw" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">14</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=bWWZ444wkUc" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">15</td>
          <td class="skill">Striking the ball games</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=L1bqfJ29ij8" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">16</td>
          <td class="skill">Striking the ball games</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=48NPBAERqqQ&list=PLBW2jzybRstemQTPGE-EHNkpUpM_uqlQM&index=14" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">17</td>
          <td class="skill">Striking the ball games</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=rCIzIGVL__Y&list=PLmKgExVr6k32lzk_9rqAUe__QoeJRb7cz&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">18</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=2B0H8IC5UQ0&list=PL8Yn8g4Hbr07qp-8LgY8DX1-W1Zxa4nVY&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">19</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=IJx4Koj0ZrI&list=PL8Yn8g4Hbr07qp-8LgY8DX1-W1Zxa4nVY" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">20</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=IJx4Koj0ZrI&list=PL8Yn8g4Hbr07qp-8LgY8DX1-W1Zxa4nVY" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">21</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=y8TWiyItY8c&list=PLA756190883A0FDFF&index=38" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">22</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=vy3Vp0nVYE4&list=PLA756190883A0FDFF&index=37" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">23</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=07lrS7lcm1E" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">24</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=nKRgBye98bg" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">25</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=OsgbY60vueA" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">26</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=KAHzxiYPIPU&t=43s" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">27</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=_92IepfJteU&t=203s" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">28</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=eCuu_Vf_1l4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">29</td>
          <td class="skill">U8 Pack</td>
          <td class="type">Games</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=_cKwRa3xBnA&list=PLBW2jzybRsteEMEGlYagb6b4Y6XCMlsjc&index=7" target="_blank">▶ Watch</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section" id="age-u10">
    <div class="section-header">
      AGE: U10
      <span class="count">50 videos</span>
    </div>
    <table class="video-table">
      <thead>
        <tr>
          <th class="num">#</th>
          <th>Skill</th>
          <th class="type">Type</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="num">1</td>
          <td class="skill">Ball Control</td>
          <td class="type">Juggling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Nxr9Pev3e_0&list=PLE_XRZxiHafZdcnsm2buwJDVA_0lf_moi" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">2</td>
          <td class="skill">Ball Control</td>
          <td class="type">Juggling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=MBiUt_DRSu0&list=PLE_XRZxiHafZdcnsm2buwJDVA_0lf_moi&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">3</td>
          <td class="skill">Ball Control</td>
          <td class="type">Juggling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=rc2R4X1427s&list=PLE_XRZxiHafZdcnsm2buwJDVA_0lf_moi&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">4</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=OsgbY60vueA&t=1s" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">5</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=y8TWiyItY8c&list=PLA756190883A0FDFF&index=38" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">6</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=2e0TwCa-jXU&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=8" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">7</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=07lrS7lcm1E&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">8</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=KAHzxiYPIPU&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">9</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=-_oytKzrYS0&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">10</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=_92IepfJteU&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=9" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">11</td>
          <td class="skill">Ball Mastery</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=SzEv7LXgvIs&list=PLr1_2mXGiOq95i9fZe2eFQl3EIXbhgfU3&index=1" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">12</td>
          <td class="skill">Ball Mastery</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=dKIuxo_-jII&list=PLr1_2mXGiOq95i9fZe2eFQl3EIXbhgfU3&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">13</td>
          <td class="skill">Ball Mastery</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Mt2xeVaBAXk&list=PLr1_2mXGiOq95i9fZe2eFQl3EIXbhgfU3&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">14</td>
          <td class="skill">Ball Mastery</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=0oCDVKeIwfs&list=PLr1_2mXGiOq95i9fZe2eFQl3EIXbhgfU3&index=5" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">15</td>
          <td class="skill">Roll and Stop</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=kKnDKnAHc0c&list=PLlQGDz03j96aVk_cWWZcSfKT9_2w5GtMV&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">16</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=IJx4Koj0ZrI&list=PL8Yn8g4Hbr07qp-8LgY8DX1-W1Zxa4nVY" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">17</td>
          <td class="skill">Taps and roles Basic</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=2B0H8IC5UQ0&list=PL8Yn8g4Hbr07qp-8LgY8DX1-W1Zxa4nVY&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">18</td>
          <td class="skill">Dribbling games</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=l2D6bnMBiBw" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">19</td>
          <td class="skill">Different turns</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=ku6SmhFP8p0" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">20</td>
          <td class="skill">Drag back</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=NCaS743Pw2E" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">21</td>
          <td class="skill">Drag back</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=NCaS743Pw2E&list=PLlQGDz03j96aVk_cWWZcSfKT9_2w5GtMV" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">22</td>
          <td class="skill">Drag back Turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=YpuAC0whCY4&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV&index=5" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">23</td>
          <td class="skill">Dribbling and Turns</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=D1iPucNaNbk" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">24</td>
          <td class="skill">Dribbling w/Laces</td>
          <td class="type">Dribbling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=JWFdGUkvPEw&list=PLlQGDz03j96aVk_cWWZcSfKT9_2w5GtMV&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">25</td>
          <td class="skill">Inside / Outside cut</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Gms0BBPdGiY&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">26</td>
          <td class="skill">Inside Cuts</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=yLmp9dxklgI" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">27</td>
          <td class="skill">Maradona & Cruyff Turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=zVEeum8wA6U&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">28</td>
          <td class="skill">Outside Hook</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="http://www.youtube.com/watch?v=82yNVKpp6NA" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">29</td>
          <td class="skill">Step over turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Z2XcxeCE-1M&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV&index=4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">30</td>
          <td class="skill">Stop and Turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=626Pcuu_XKw&list=PLlQGDz03j96aVk_cWWZcSfKT9_2w5GtMV&index=7" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">31</td>
          <td class="skill">Stop turn and hook turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=djVEfpvQU5A&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV&index=7" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">32</td>
          <td class="skill">U Turn and Taps</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=CRVWkZJ0w-4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">33</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=gt82ixhdaVY&list=PL8Yn8g4Hbr07qp-8LgY8DX1-W1Zxa4nVY&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">34</td>
          <td class="skill">Ronaldo and Ronaldinho</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=1AGgz8C8NRc&list=PLE_XRZxiHafbhzhAB7bXFb0XxqcvR_yNv&index=4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">35</td>
          <td class="skill">Side Step and Double Side step</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Zuu7mDzZA2g&list=PLE_XRZxiHafbhzhAB7bXFb0XxqcvR_yNv&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">36</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=6dcW1VhK3Yw&list=PLE_XRZxiHafbhzhAB7bXFb0XxqcvR_yNv" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">37</td>
          <td class="skill">Drag Push, Scissors, Side step</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=zQYVXRzwou4&list=PLE_XRZxiHafbhzhAB7bXFb0XxqcvR_yNv&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">38</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=a_kzsM66g6c&list=PLA756190883A0FDFF&index=33" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">39</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=FyDtiF7MDgs&list=PLA756190883A0FDFF&index=35" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">40</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=jN-xI8gIfo4&list=PLA756190883A0FDFF&index=33" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">41</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=nQdTGtl8XG0&list=PLA756190883A0FDFF&index=28" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">42</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=6dcW1VhK3Yw" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">43</td>
          <td class="skill">Dribbling & Striking the ball</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=O32wHarDd-U" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">44</td>
          <td class="skill">Dribbling & Striking the ball</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=XCoSPAADfXE" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">45</td>
          <td class="skill">Striking the ball games</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=oCTEPnUVl1k" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">46</td>
          <td class="skill">Striking the ball games</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=4tHE56vnQOw" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">47</td>
          <td class="skill">Striking the ball games</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=ClVU-uXgPQ0" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">48</td>
          <td class="skill">Striking the ball games</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=JWShkhXxDZM" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">49</td>
          <td class="skill">Passing and receiving</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=IcRXb7OdyVk" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">50</td>
          <td class="skill">Striking to the goal</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=zikFAfFP5TQ&t=6s" target="_blank">▶ Watch</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section" id="age-u11-u12-and-13plus">
    <div class="section-header">
      AGE: U11, U12 and 13+
      <span class="count">59 videos</span>
    </div>
    <table class="video-table">
      <thead>
        <tr>
          <th class="num">#</th>
          <th>Skill</th>
          <th class="type">Type</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="num">1</td>
          <td class="skill">Ball Control - Juggling 1</td>
          <td class="type">Juggling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Nxr9Pev3e_0&list=PLE_XRZxiHafZdcnsm2buwJDVA_0lf_moi" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">2</td>
          <td class="skill">Ball Control - Juggling 2</td>
          <td class="type">Juggling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=MBiUt_DRSu0&list=PLE_XRZxiHafZdcnsm2buwJDVA_0lf_moi&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">3</td>
          <td class="skill">Ball Control - Juggling 3</td>
          <td class="type">Juggling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=rc2R4X1427s&list=PLE_XRZxiHafZdcnsm2buwJDVA_0lf_moi&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">4</td>
          <td class="skill">Ball Control - Juggling 4</td>
          <td class="type">Juggling</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=YpsljDmh6xM&list=PLE_XRZxiHafZdcnsm2buwJDVA_0lf_moi&index=4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">5</td>
          <td class="skill">Sole, Heel and Toe rolls</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=y8TWiyItY8c&list=PLA756190883A0FDFF&index=38" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">6</td>
          <td class="skill">Taps on top of the ball</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=2e0TwCa-jXU&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=8" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">7</td>
          <td class="skill">Inside of the foot taps/roll</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=07lrS7lcm1E&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">8</td>
          <td class="skill">Inside of the foot taps/roll</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=KAHzxiYPIPU&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">9</td>
          <td class="skill">Inside of the foot taps/roll</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=2e0TwCa-jXU&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=8" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">10</td>
          <td class="skill">In and out double touches</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=WS0BhRvcYrM&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=6" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">11</td>
          <td class="skill">Inside-outside</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=CQETxlp5eOw&list=PLE_XRZxiHafZ9UL4Nw7-bppJrw7JfYDr9&index=7" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">12</td>
          <td class="skill">Sole And Toe Rolls</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=y8TWiyItY8c&list=PLA756190883A0FDFF&index=43" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">13</td>
          <td class="skill">In and Outside</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="http://www.youtube.com/watch?v=vy3Vp0nVYE4&list=PLA756190883A0FDFF&index=42" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">14</td>
          <td class="skill">V Outside Pull</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=hOhVq8KRrCU&list=PLA756190883A0FDFF&index=41" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">15</td>
          <td class="skill">Toe taps slap stepover</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="http://www.youtube.com/watch?v=1zKoA3BxYRQ&list=PLA756190883A0FDFF&index=39" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">16</td>
          <td class="skill">Outside roll step behind</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=a_kzsM66g6c&list=PLA756190883A0FDFF&index=38" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">17</td>
          <td class="skill">Pullback around the foot</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=QGtvUh1QECg&list=PLA756190883A0FDFF&index=36" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">18</td>
          <td class="skill">Inside rollover step on</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=sRZbWEB30BI&list=PLA756190883A0FDFF&index=32" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">19</td>
          <td class="skill">Fancy toe tapping</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=XjLtlxnes9A&list=PLA756190883A0FDFF&index=29" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">20</td>
          <td class="skill">Pull push, Pull behind</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=_ORsJM-BvzI&list=PLA756190883A0FDFF&index=27" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">21</td>
          <td class="skill">Single In and Outs</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Snt1Sfp1R4g&list=PLA756190883A0FDFF&index=26" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">22</td>
          <td class="skill">Pull Push Step over</td>
          <td class="type">Roll & Taps</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=eBmdW7YLELQ&list=PLA756190883A0FDFF&index=40" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">23</td>
          <td class="skill">Drag back</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=NCaS743Pw2E" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">24</td>
          <td class="skill">Outside Hook</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="http://www.youtube.com/watch?v=82yNVKpp6NA" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">25</td>
          <td class="skill">Inside Cuts</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=yLmp9dxklgI" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">26</td>
          <td class="skill">Step over turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=1VqpYrD1zWs&feature=results_main&playnext=1&list=PL84183C4D3ABED6C0" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">27</td>
          <td class="skill">Inside / Outside cut</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Gms0BBPdGiY&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">29</td>
          <td class="skill">Double inside / Xavi Turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=YykoZL1XwLM&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">30</td>
          <td class="skill">Maradona & Cruyff Turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=zVEeum8wA6U&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">31</td>
          <td class="skill">Step over turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Z2XcxeCE-1M&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV&index=4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">32</td>
          <td class="skill">Drag back Turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=YpuAC0whCY4&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV&index=5" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">33</td>
          <td class="skill">Stop turn and hook turn</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=djVEfpvQU5A&list=PLE_XRZxiHafYji2KfOAo_a7CWGs5klSOV&index=7" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">34</td>
          <td class="skill">Inside of the foot Twist off</td>
          <td class="type">TURNS</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=UvFf8YblCtU&list=PLlQGDz03j96boy2Yd1lIA_nm-Q2LzrfWP&index=4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">35</td>
          <td class="skill">5 turns and dribble</td>
          <td class="type">Turning & Dribble</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=TiQrdVjT-xw" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">36</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=gt82ixhdaVY&list=PL8Yn8g4Hbr07qp-8LgY8DX1-W1Zxa4nVY&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">37</td>
          <td class="skill">Ronaldo and Ronaldinho</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=1AGgz8C8NRc&list=PLE_XRZxiHafbhzhAB7bXFb0XxqcvR_yNv&index=4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">39</td>
          <td class="skill">Side Step and Double Side step</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Zuu7mDzZA2g&list=PLE_XRZxiHafbhzhAB7bXFb0XxqcvR_yNv&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">40</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=6dcW1VhK3Yw&list=PLE_XRZxiHafbhzhAB7bXFb0XxqcvR_yNv" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">41</td>
          <td class="skill">Drag Push, Scissors, Side step</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=zQYVXRzwou4&list=PLE_XRZxiHafbhzhAB7bXFb0XxqcvR_yNv&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">42</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=a_kzsM66g6c&list=PLA756190883A0FDFF&index=33" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">43</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=FyDtiF7MDgs&list=PLA756190883A0FDFF&index=35" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">44</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=jN-xI8gIfo4&list=PLA756190883A0FDFF&index=33" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">45</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=nQdTGtl8XG0&list=PLA756190883A0FDFF&index=28" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">46</td>
          <td class="skill">Dribbling Moves</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=6dcW1VhK3Yw" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">47</td>
          <td class="skill">Inside, Inside, Inside outside</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=44RZ4ChasC4&list=PLlQGDz03j96boy2Yd1lIA_nm-Q2LzrfWP&index=1" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">48</td>
          <td class="skill">Drag Back push forward</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=PBPTrbrQn3Y&list=PLlQGDz03j96boy2Yd1lIA_nm-Q2LzrfWP&index=9" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">49</td>
          <td class="skill">Ronaldo Take on</td>
          <td class="type">1v1 Moves</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=MMtMK549hRo&list=PLlQGDz03j96amSra89T2ehhmreZ7A3Hxi&index=2" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">50</td>
          <td class="skill">Alex Morgan Shooting Drill</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=CoOywfloJ7w&list=RDCMUC2VOLCrgkwtINNT-MUv8BSQ&index=3" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">51</td>
          <td class="skill">Alex Morgan Finishing</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=G4uVZxHtfAg&list=RDCMUC2VOLCrgkwtINNT-MUv8BSQ&index=4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">52</td>
          <td class="skill">More Goals with Alex Morgan</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=rXjcHd4l9u4&list=RDCMUC2VOLCrgkwtINNT-MUv8BSQ&index=6" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">53</td>
          <td class="skill">2 Person Passing and Receiving</td>
          <td class="type">Passing and Rec</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=3fusl5944qU&list=RDCMUC2VOLCrgkwtINNT-MUv8BSQ&index=9" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">54</td>
          <td class="skill">Passing after change/Direction</td>
          <td class="type">Passing and Rec</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=Mh6XYcOy3k4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">55</td>
          <td class="skill">Shooting Challenge</td>
          <td class="type">Passing and Rec</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=zikFAfFP5TQ&t=12s" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">56</td>
          <td class="skill">3 Cone passing challenge</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=IcRXb7OdyVk" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">57</td>
          <td class="skill">Gate Speed Passing</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=B8PCRRA1cq4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">58</td>
          <td class="skill">Passing and Receiving with/wall</td>
          <td class="type">Passing and Rec</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=XLL1WEJJ9i4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">59</td>
          <td class="skill">Passing using a wall</td>
          <td class="type">Passing and Rec</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=qQ6caAty7VI" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">60</td>
          <td class="skill">Zig & Zag Shooting</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=zcf34lSctN4" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">61</td>
          <td class="skill">Aguero Shooting challenge</td>
          <td class="type">Striking the ball</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=zOuBLJpQkCo" target="_blank">▶ Watch</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section" id="useful-sites-for-ideas">
    <div class="section-header">
      Useful sites for IDEAS
      <span class="count">16 videos</span>
    </div>
    <table class="video-table">
      <thead>
        <tr>
          <th class="num">#</th>
          <th>Channel</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="num">1</td>
          <td class="skill">Anytime Soccer Training</td>
          <td class="link"><a href="https://www.youtube.com/@AnytimeSoccerTraining" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">2</td>
          <td class="skill">Corver Coaching NW</td>
          <td class="link"><a href="https://www.youtube.com/channel/UCYIdxdh4FtSg8N5x-oVLW1A" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">3</td>
          <td class="skill">Football Skill Coach</td>
          <td class="link"><a href="https://www.youtube.com/channel/UCLSdq6bB5cfOR4cSgl79Trg" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">4</td>
          <td class="skill">Coach Media Group</td>
          <td class="link"><a href="https://www.youtube.com/channel/UCDumbGRVMFJ7OCxQmoxQPIg" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">5</td>
          <td class="skill">Soccer Skill USA</td>
          <td class="link"><a href="https://www.youtube.com/channel/UCRNoMqHXof3Xe93yg0oYIdg" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">6</td>
          <td class="skill">Beast Mode</td>
          <td class="link"><a href="https://www.youtube.com/channel/UC2VOLCrgkwtINNT-MUv8BSQ" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">7</td>
          <td class="skill">Coach Thomas Vlaminck</td>
          <td class="link"><a href="https://www.youtube.com/channel/UCsI-Q2zFgAZRTLPkVmIdSdw" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">8</td>
          <td class="skill">Coerver United</td>
          <td class="link"><a href="https://www.youtube.com/channel/UC88ljuCQd2Bz6Nw5c_hzstA" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">9</td>
          <td class="skill">My Personal Coach</td>
          <td class="link"><a href="https://www.youtube.com/channel/UCkyywhlqhEGTYdAebSXGaBQ" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">10</td>
          <td class="skill">Coerver United</td>
          <td class="link"><a href="https://www.youtube.com/channel/UC0HkcVQCx6P-V99uG7y-Z9w" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">11</td>
          <td class="skill">TSSA</td>
          <td class="link"><a href="https://www.youtube.com/channel/UCvJNhFOOa9YYb8lhb5hGvyQ" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">12</td>
          <td class="skill">Cal south</td>
          <td class="link"><a href="https://www.youtube.com/channel/UCwPJVCyXJnw7ujEcacUXF_w" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">13</td>
          <td class="skill">Yael Averbuch</td>
          <td class="link"><a href="https://www.youtube.com/channel/UCE6t0SCtOq65dDTtfptRHHw" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">14</td>
          <td class="skill">Skill Level 2</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=44RZ4ChasC4&list=PLlQGDz03j96boy2Yd1lIA_nm-Q2LzrfWP" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">15</td>
          <td class="skill">Skill Level 3</td>
          <td class="link"><a href="https://www.youtube.com/watch?v=-JG2DHIaK2o&list=PLlQGDz03j96amSra89T2ehhmreZ7A3Hxi" target="_blank">▶ Watch</a></td>
        </tr>
        <tr>
          <td class="num">16</td>
          <td class="skill">7MLC</td>
          <td class="link"><a href="https://www.youtube.com/channel/UC9xRcqG8V6yNi6Hum92EoGg" target="_blank">▶ Watch</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;

export default function YtlDownloadPage() {
  return (
    <article>
      <div
        className="wp-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
