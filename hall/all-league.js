// ---------- All-league teams (latest season) ----------
const AL = (label, title, cols, rows, note) => ({label, title, cols, rows: R(rows), note});
HALL.football.allLeague = AL('All-Pro', '2025 AP All-Pro first team', ['Position','Player','Team'], `
QB|Matthew Stafford|Rams
RB|Bijan Robinson|Falcons
FB|Kyle Juszczyk|49ers
WR|Puka Nacua|Rams
WR|Jaxon Smith-Njigba|Seahawks
WR|Ja’Marr Chase|Bengals
TE|Trey McBride|Cardinals
All-purpose|Christian McCaffrey|49ers
LT|Garett Bolles|Broncos
LG|Joe Thuney|Bears
C|Creed Humphrey|Chiefs
RG|Quinn Meinerz|Broncos
RT|Penei Sewell|Lions
EDGE|Myles Garrett|Browns
EDGE|Will Anderson Jr.|Texans
EDGE|Micah Parsons|Packers
DT|Jeffery Simmons|Titans
DT|Zach Allen|Broncos
LB|Jack Campbell|Lions
LB|Jordyn Brooks|Dolphins
CB|Derek Stingley Jr.|Texans
CB|Quinyon Mitchell|Eagles
Slot CB|Cooper DeJean|Eagles
S|Kyle Hamilton|Ravens
S|Kevin Byard|Bears
K|Will Reichard|Vikings
P|Jordan Stout|Ravens
KR|Ray Davis|Bills
PR|Chimere Dike|Titans
Special teams|Devon Key|Broncos
Long snapper|Ross Matiscik|Jaguars`, 'Announced January 2026. Garrett, Nacua and Smith-Njigba were unanimous. It was Stafford’s first All-Pro selection, in his 17th season.');
HALL.basketball.allLeague = AL('All-NBA', '2025–26 All-NBA First Team', ['Player','Team'], `
Shai Gilgeous-Alexander|Oklahoma City Thunder
Nikola Jokić|Denver Nuggets
Victor Wembanyama|San Antonio Spurs
Cade Cunningham|Detroit Pistons
Luka Dončić|Los Angeles Lakers`, 'Announced May 2026. Gilgeous-Alexander and Jokić were unanimous; it was Wembanyama’s first All-NBA selection.');
HALL.baseball.allLeague = AL('All-MLB', '2025 All-MLB First Team', ['Position','Player','Team'], `
C|Cal Raleigh|Mariners
1B|Vladimir Guerrero Jr.|Blue Jays
2B|Ketel Marte|Diamondbacks
3B|José Ramírez|Guardians
SS|Bobby Witt Jr.|Royals
OF|Aaron Judge|Yankees
OF|Juan Soto|Mets
OF|Julio Rodríguez|Mariners
DH|Shohei Ohtani|Dodgers
SP|Paul Skenes|Pirates
SP|Tarik Skubal|Tigers
SP|Garrett Crochet|Red Sox
SP|Yoshinobu Yamamoto|Dodgers
SP|Max Fried|Yankees
RP|Aroldis Chapman|Red Sox
RP|Jhoan Duran|Phillies`, 'Announced November 2025. The 2026 team is due in December.');
HALL.hockey.allLeague = AL('All-Stars', '2025–26 NHL First All-Star Team', ['Position','Player','Team'], `
G|Andrei Vasilevskiy|Lightning
D|Zach Werenski|Blue Jackets
D|Cale Makar|Avalanche
C|Connor McDavid|Oilers
RW|Nikita Kucherov|Lightning
LW|Jason Robertson|Stars`, 'Announced June 2026. McDavid’s sixth first-team nod at center is tied for second all-time behind Wayne Gretzky’s eight.');
HALL.soccer.allLeague = AL('Team of the Year', '2025–26 PFA Premier League Team of the Year', ['Position','Player','Club'], `
GK|David Raya|Arsenal
D|Jurriën Timber|Arsenal
D|William Saliba|Arsenal
D|Gabriel Magalhães|Arsenal
D|Nico O’Reilly|Manchester City
M|Bruno Fernandes|Manchester United
M|Declan Rice|Arsenal
M|Rayan Cherki|Manchester City
F|Antoine Semenyo|Manchester City
F|Erling Haaland|Manchester City
F|Igor Thiago|Brentford`, 'Voted by the players. Bruno Fernandes was PFA Players’ Player of the Year after a Premier League-record 21 assists.');
HALL.tennis.allLeague = AL('Year-end No. 1', 'Year-end world No. 1', ['Year','Men (ATP)','Women (WTA)'], `
2026|Alexander Zverev|Elena Rybakina
2025|Carlos Alcaraz|Aryna Sabalenka
2024|Jannik Sinner|Aryna Sabalenka
2023|Novak Djokovic|Aryna Sabalenka
2022|Carlos Alcaraz|Iga Świątek
2021|Novak Djokovic|Ashleigh Barty
2020|Novak Djokovic|Ashleigh Barty
2019|Rafael Nadal|Ashleigh Barty
2018|Novak Djokovic|Simona Halep
2017|Rafael Nadal|Simona Halep
2016|Andy Murray|Angelique Kerber
2015|Novak Djokovic|Serena Williams
2014|Novak Djokovic|Serena Williams
2013|Rafael Nadal|Serena Williams
2012|Novak Djokovic|Victoria Azarenka
2011|Novak Djokovic|Caroline Wozniacki
2010|Rafael Nadal|Caroline Wozniacki
2009|Roger Federer|Serena Williams
2008|Rafael Nadal|Jelena Janković
2007|Roger Federer|Justine Henin
2006|Roger Federer|Justine Henin
2005|Roger Federer|Lindsay Davenport
2004|Roger Federer|Lindsay Davenport
2003|Andy Roddick|Justine Henin
2002|Lleyton Hewitt|Serena Williams
2001|Lleyton Hewitt|Lindsay Davenport
2000|Gustavo Kuerten|Martina Hingis
1999|Andre Agassi|Martina Hingis
1998|Pete Sampras|Lindsay Davenport
1997|Pete Sampras|Martina Hingis
1996|Pete Sampras|Steffi Graf
1995|Pete Sampras|Steffi Graf
1994|Pete Sampras|Steffi Graf
1993|Pete Sampras|Steffi Graf
1992|Jim Courier|Monica Seles
1991|Stefan Edberg|Monica Seles
1990|Stefan Edberg|Steffi Graf
1989|Ivan Lendl|Steffi Graf
1988|Mats Wilander|Steffi Graf
1987|Ivan Lendl|Steffi Graf
1986|Ivan Lendl|Martina Navratilova
1985|Ivan Lendl|Martina Navratilova
1984|John McEnroe|Martina Navratilova
1983|John McEnroe|Martina Navratilova
1982|John McEnroe|Martina Navratilova
1981|John McEnroe|Chris Evert
1980|Björn Borg|Chris Evert
1979|Björn Borg|Martina Navratilova
1978|Jimmy Connors|Martina Navratilova
1977|Jimmy Connors|Chris Evert
1976|Jimmy Connors|Chris Evert
1975|Jimmy Connors|Chris Evert
1974|Jimmy Connors|—
1973|Ilie Năstase|—`, 'ATP rankings began in 1973, WTA rankings in 1975. Zverev and Rybakina both finished No. 1 for the first time in 2026.');

