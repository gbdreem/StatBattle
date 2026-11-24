// ---------- Famous teams (rivalries for tennis, iconic fights for combat sports) ----------
// {n: name, y: when, r: record/result, d: why it is famous, p: key people}
const F = (label, items) => ({label, items});
HALL.football.famous = F('Famous teams', [
 {n:'Miami Dolphins', y:'1972', r:'17–0', d:'The only perfect season in NFL history, capped by a 14–7 win in Super Bowl VII.', p:'Bob Griese, Larry Csonka, Earl Morrall, the “No-Name Defense”'},
 {n:'Chicago Bears', y:'1985', r:'18–1', d:'Buddy Ryan’s “46” defense smothered the league, then crushed New England 46–10 in Super Bowl XX.', p:'Walter Payton, Mike Singletary, Richard Dent, Jim McMahon'},
 {n:'New England Patriots', y:'2007', r:'18–1', d:'The first 16–0 regular season and a then-record 589 points, undone by the Giants in Super Bowl XLII.', p:'Tom Brady (50 TD passes), Randy Moss (23 TD catches)'},
 {n:'San Francisco 49ers', y:'1989', r:'17–2', d:'Won Super Bowl XXIV 55–10, the biggest margin in Super Bowl history, for back-to-back titles.', p:'Joe Montana, Jerry Rice, Ronnie Lott'},
 {n:'Pittsburgh Steelers', y:'1974–1979', r:'4 Super Bowls in 6 seasons', d:'The “Steel Curtain” dynasty and the first team to win four Super Bowls.', p:'Terry Bradshaw, Franco Harris, Joe Greene, Jack Lambert'},
 {n:'Green Bay Packers', y:'1961–1967', r:'5 titles in 7 seasons', d:'Vince Lombardi’s Packers won three straight titles, including the first two Super Bowls.', p:'Bart Starr, Paul Hornung, Ray Nitschke'},
 {n:'St. Louis Rams', y:'1999', r:'16–3', d:'“The Greatest Show on Turf” went from 4–12 to champions behind a former grocery clerk at quarterback.', p:'Kurt Warner, Marshall Faulk, Isaac Bruce'},
 {n:'Seattle Seahawks', y:'2013', r:'16–3', d:'The “Legion of Boom” led the league in defense and routed Peyton Manning’s record-setting Broncos 43–8.', p:'Richard Sherman, Earl Thomas, Kam Chancellor, Russell Wilson'}
]);
HALL.basketball.famous = F('Famous teams', [
 {n:'Chicago Bulls', y:'1995–96', r:'72–10, title', d:'Set the wins record and went 15–3 in the playoffs, the start of a second three-peat.', p:'Michael Jordan, Scottie Pippen, Dennis Rodman'},
 {n:'Golden State Warriors', y:'2015–16', r:'73–9', d:'Broke the Bulls’ record with the first unanimous MVP, then lost the Finals after leading Cleveland 3–1.', p:'Stephen Curry, Klay Thompson, Draymond Green'},
 {n:'Golden State Warriors', y:'2016–17', r:'67–15, 16–1 playoffs', d:'Added Kevin Durant and posted the best playoff record ever.', p:'Stephen Curry, Kevin Durant'},
 {n:'Boston Celtics', y:'1985–86', r:'67–15, 40–1 at home', d:'Often called the best frontcourt ever assembled; Bird won his third straight MVP.', p:'Larry Bird, Kevin McHale, Robert Parish, Bill Walton'},
 {n:'Los Angeles Lakers', y:'1971–72', r:'69–13', d:'Won 33 games in a row, still the longest streak in major U.S. pro sports.', p:'Jerry West, Wilt Chamberlain, Gail Goodrich'},
 {n:'Philadelphia 76ers', y:'1966–67', r:'68–13, title', d:'Ended Boston’s run of eight straight championships.', p:'Wilt Chamberlain, Hal Greer, Billy Cunningham'},
 {n:'Los Angeles Lakers', y:'2000–01', r:'15–1 playoffs', d:'The middle of a three-peat, with the best playoff record until 2017.', p:'Shaquille O’Neal, Kobe Bryant'},
 {n:'Boston Celtics', y:'1957–1969', r:'11 titles in 13 seasons', d:'Bill Russell’s Celtics, including eight championships in a row (1959–66).', p:'Bill Russell, Bob Cousy, John Havlicek, Sam Jones'}
]);
HALL.baseball.famous = F('Famous teams', [
 {n:'New York Yankees', y:'1927', r:'110–44, swept the World Series', d:'“Murderers’ Row”: Ruth hit 60 home runs and the lineup is still the standard for greatness.', p:'Babe Ruth, Lou Gehrig, Tony Lazzeri'},
 {n:'New York Yankees', y:'1998', r:'114–48, 125–50 with playoffs', d:'The most total wins in a season, ending with a World Series sweep.', p:'Derek Jeter, Bernie Williams, Mariano Rivera'},
 {n:'Chicago Cubs', y:'1906', r:'116–36 (.763)', d:'The best winning percentage of the modern era, then upset by the crosstown White Sox in the World Series.', p:'Tinker, Evers and Chance; Mordecai Brown'},
 {n:'Seattle Mariners', y:'2001', r:'116–46', d:'Tied the wins record in Ichiro’s rookie season but lost in the ALCS.', p:'Ichiro Suzuki, Bret Boone, Edgar Martínez'},
 {n:'Cincinnati Reds', y:'1975–76', r:'2 straight titles', d:'The “Big Red Machine” went 7–0 in the 1976 postseason.', p:'Johnny Bench, Pete Rose, Joe Morgan, Tony Pérez'},
 {n:'New York Mets', y:'1969', r:'100–62, title', d:'The “Miracle Mets” had never finished higher than ninth before winning it all.', p:'Tom Seaver, Jerry Koosman, Cleon Jones'},
 {n:'Boston Red Sox', y:'2004', r:'98–64, title', d:'The first team to come back from 0–3 in a postseason series (against the Yankees), ending an 86-year title drought.', p:'David Ortiz, Manny Ramirez, Curt Schilling'},
 {n:'Chicago Cubs', y:'2016', r:'103–58, title', d:'Won Game 7 in extra innings in Cleveland to end a 108-year drought.', p:'Kris Bryant, Anthony Rizzo, Ben Zobrist'}
]);
HALL.hockey.famous = F('Famous teams', [
 {n:'Montreal Canadiens', y:'1976–77', r:'60–8–12, Cup', d:'Lost just eight games in an 80-game season, the fewest ever.', p:'Guy Lafleur, Ken Dryden, Larry Robinson'},
 {n:'Montreal Canadiens', y:'1955–1960', r:'5 straight Cups', d:'The only team to win five Stanley Cups in a row.', p:'Maurice Richard, Jean Béliveau, Jacques Plante'},
 {n:'New York Islanders', y:'1979–1983', r:'4 straight Cups', d:'Won 19 straight playoff series, a record for North American pro sports.', p:'Mike Bossy, Bryan Trottier, Denis Potvin, Billy Smith'},
 {n:'Edmonton Oilers', y:'1983–84', r:'57–18–5, Cup', d:'Scored 446 goals, still the NHL record, and won the first of five Cups in seven years.', p:'Wayne Gretzky, Mark Messier, Jari Kurri, Paul Coffey'},
 {n:'Boston Bruins', y:'2022–23', r:'65–12–5', d:'Set records for wins and points (135) in a season, then lost in the first round.', p:'David Pastrňák, Patrice Bergeron, Linus Ullmark'},
 {n:'Team USA (Olympics)', y:'1980', r:'Gold medal', d:'The “Miracle on Ice”: college players beat the Soviet Union 4–3 at Lake Placid.', p:'Herb Brooks, Mike Eruzione, Jim Craig'},
 {n:'Vegas Golden Knights', y:'2017–18', r:'51–24–7', d:'An expansion team that reached the Stanley Cup Final in its first season.', p:'Marc-André Fleury, William Karlsson, Jonathan Marchessault'},
 {n:'New York Rangers', y:'1993–94', r:'52–24–8, Cup', d:'Ended a 54-year Cup drought, sealed in Game 7 against Vancouver.', p:'Mark Messier, Brian Leetch, Mike Richter'}
]);
HALL.soccer.famous = F('Famous teams', [
 {n:'Brazil', y:'1970', r:'6–0 at the World Cup', d:'Won every match in Mexico; Jairzinho scored in every game. Often called the greatest national team.', p:'Pelé, Jairzinho, Carlos Alberto, Rivelino'},
 {n:'Real Madrid', y:'1956–1960', r:'5 straight European Cups', d:'Won the first five European Cups, finishing with a 7–3 final in Glasgow.', p:'Alfredo Di Stéfano, Ferenc Puskás, Francisco Gento'},
 {n:'Ajax', y:'1971–1973', r:'3 straight European Cups', d:'“Total Football”: every outfield player could swap roles.', p:'Johan Cruyff, Johan Neeskens, Piet Keizer'},
 {n:'Arsenal', y:'2003–04', r:'26W 12D 0L', d:'“The Invincibles”: the only unbeaten 38-game top-flight season in English history.', p:'Thierry Henry, Patrick Vieira, Dennis Bergkamp'},
 {n:'Manchester United', y:'1998–99', r:'Treble', d:'League, FA Cup and Champions League, the last won with two stoppage-time goals against Bayern.', p:'Sir Alex Ferguson, David Beckham, Roy Keane, Ole Gunnar Solskjær'},
 {n:'Barcelona', y:'2008–09', r:'Treble, then six trophies in 2009', d:'Pep Guardiola’s first season; tiki-taka at its peak.', p:'Lionel Messi, Xavi, Andrés Iniesta'},
 {n:'Spain', y:'2008–2012', r:'Euro, World Cup, Euro', d:'The only men’s team to win three straight major tournaments.', p:'Iker Casillas, Xavi, Andrés Iniesta, David Villa'},
 {n:'Leicester City', y:'2015–16', r:'Premier League champions', d:'Started the season as 5,000–1 outsiders.', p:'Jamie Vardy, Riyad Mahrez, N’Golo Kanté, coach Claudio Ranieri'}
]);
HALL.tennis.famous = F('Rivalries', [
 {n:'Novak Djokovic vs Rafael Nadal', y:'2006–2024', r:'60 matches, Djokovic 31–29', d:'The most-played rivalry in men’s tennis, including a 5-hour 53-minute 2012 Australian Open final.', p:''},
 {n:'Roger Federer vs Rafael Nadal', y:'2004–2019', r:'40 matches, Nadal 24–16', d:'Their 2008 Wimbledon final, won by Nadal in near-darkness, is often called the greatest match ever.', p:''},
 {n:'Chris Evert vs Martina Navratilova', y:'1973–1988', r:'80 matches, Navratilova 43–37', d:'Met in 14 Grand Slam finals; contrasting styles that defined women’s tennis for 15 years.', p:''},
 {n:'Björn Borg vs John McEnroe', y:'1978–1981', r:'14 matches, 7–7', d:'Ice versus fire. Their 1980 Wimbledon final had an 18–16 fourth-set tiebreak.', p:''},
 {n:'Pete Sampras vs Andre Agassi', y:'1989–2002', r:'34 matches, Sampras 20–14', d:'Serve-and-volley against the best returner of the era; their last match was the 2002 US Open final.', p:''},
 {n:'Serena vs Venus Williams', y:'1998–2020', r:'31 matches, Serena 19–12', d:'Sisters who met in nine Grand Slam finals, including four in a row from 2002 to 2003.', p:''},
 {n:'Carlos Alcaraz vs Jannik Sinner', y:'2021–', r:'Split 8 straight majors', d:'Between them they won every Grand Slam of 2024 and 2025.', p:''}
]);
HALL.mma.famous = F('Iconic fights', [
 {n:'Muhammad Ali vs Joe Frazier III', y:'1975', r:'Ali, RTD 14', d:'The “Thrilla in Manila,” settling a rivalry that began with Frazier’s win in the 1971 “Fight of the Century.”', p:''},
 {n:'Muhammad Ali vs George Foreman', y:'1974', r:'Ali, KO 8', d:'The “Rumble in the Jungle” in Kinshasa, won with the rope-a-dope.', p:''},
 {n:'Forrest Griffin vs Stephan Bonnar', y:'2005', r:'Griffin, UD', d:'The Ultimate Fighter finale brawl that put the UFC on cable TV for good.', p:''},
 {n:'Anderson Silva vs Chael Sonnen', y:'2010', r:'Silva, triangle choke in round 5', d:'Silva was losing every round before a late submission at UFC 117.', p:''},
 {n:'Conor McGregor vs José Aldo', y:'2015', r:'McGregor, KO in 13 seconds', d:'The fastest finish in UFC title-fight history, ending Aldo’s 10-year unbeaten run.', p:''},
 {n:'Holly Holm vs Ronda Rousey', y:'2015', r:'Holm, KO (head kick) round 2', d:'One of the biggest upsets in UFC history, ending Rousey’s unbeaten reign.', p:''},
 {n:'Khabib Nurmagomedov vs Conor McGregor', y:'2018', r:'Khabib, submission round 4', d:'UFC 229 was the biggest-selling pay-per-view in UFC history.', p:''},
 {n:'Tyson Fury vs Deontay Wilder trilogy', y:'2018–2021', r:'Draw, then two Fury KOs', d:'Fury rose from knockdowns in the first and third fights.', p:''}
]);

