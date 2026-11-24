// ---------- Leaders ----------
// Each list: {name, unit, cols (after Rank), rows}. Active players are marked with *.
const L = (name, cols, rows, note) => ({name, cols, rows: R(rows), note});
HALL.football.leaders = [
 L('Career passing yards', ['Player','Yards','Years'], `
Tom Brady|89,214|2000–2022
Drew Brees|80,358|2001–2020
Peyton Manning|71,940|1998–2015
Brett Favre|71,838|1991–2010
Aaron Rodgers*|66,274|2005–
Matthew Stafford*|64,516|2009–
Ben Roethlisberger|64,088|2004–2021
Philip Rivers|63,984|2004–2025
Matt Ryan|62,792|2008–2022
Dan Marino|61,361|1983–1999`, 'Regular season, through the 2025 season. Rivers came out of retirement for three games with the Colts in December 2025.'),
 L('Career rushing yards', ['Player','Yards','Years'], `
Emmitt Smith|18,355|1990–2004
Walter Payton|16,726|1975–1987
Frank Gore|16,000|2005–2020
Barry Sanders|15,269|1989–1998
Adrian Peterson|14,918|2007–2021
Curtis Martin|14,101|1995–2005
LaDainian Tomlinson|13,684|2001–2011
Jerome Bettis|13,662|1993–2005
Eric Dickerson|13,259|1983–1993
Derrick Henry*|13,018|2016–`, 'Regular season, through the 2025 season. Henry has since passed Dickerson, Bettis and Tomlinson during the 2026 season.'),
 L('Career receiving yards', ['Player','Yards','Years'], `
Jerry Rice|22,895|1985–2004
Larry Fitzgerald|17,492|2004–2020
Terrell Owens|15,934|1996–2010
Randy Moss|15,292|1998–2012
Isaac Bruce|15,208|1994–2009
Tony Gonzalez|15,127|1997–2013
Steve Smith Sr.|14,731|2001–2016
Marvin Harrison|14,580|1996–2008
Reggie Wayne|14,345|2001–2014
Andre Johnson|14,185|2003–2016`, 'Regular season, through the 2025 season.'),
 L('Passing yards, season', ['Player','Yards','Season'], `
Peyton Manning|5,477|2013 Broncos
Drew Brees|5,476|2011 Saints
Tom Brady|5,316|2021 Buccaneers
Patrick Mahomes|5,250|2022 Chiefs
Tom Brady|5,235|2011 Patriots
Drew Brees|5,208|2016 Saints
Drew Brees|5,177|2012 Saints
Drew Brees|5,162|2013 Saints
Ben Roethlisberger|5,129|2018 Steelers
Jameis Winston|5,109|2019 Buccaneers`, '2025 leader: Matthew Stafford, 4,707.'),
 L('Rushing yards, season', ['Player','Yards','Season'], `
Eric Dickerson|2,105|1984 Rams
Adrian Peterson|2,097|2012 Vikings
Jamal Lewis|2,066|2003 Ravens
Barry Sanders|2,053|1997 Lions
Derrick Henry|2,027|2020 Titans
Terrell Davis|2,008|1998 Broncos
Chris Johnson|2,006|2009 Titans
Saquon Barkley|2,005|2024 Eagles
O.J. Simpson|2,003|1973 Bills
Earl Campbell|1,934|1980 Oilers`, '2025 leader: James Cook, 1,621.'),
 L('Receiving yards, season', ['Player','Yards','Season'], `
Calvin Johnson|1,964|2012 Lions
Cooper Kupp|1,947|2021 Rams
Julio Jones|1,871|2015 Falcons
Jerry Rice|1,848|1995 49ers
Antonio Brown|1,834|2015 Steelers
Justin Jefferson|1,809|2022 Vikings
Tyreek Hill|1,799|2023 Dolphins
Jaxon Smith-Njigba|1,793|2025 Seahawks
Isaac Bruce|1,781|1995 Rams
Charley Hennigan|1,746|1961 Oilers (AFL)`, 'Jaxon Smith-Njigba led the league in 2025.')
];
HALL.basketball.leaders = [
 L('Career points', ['Player','Points','Years'], `
LeBron James*|43,440|2003–
Kareem Abdul-Jabbar|38,387|1969–1989
Karl Malone|36,928|1985–2004
Kobe Bryant|33,643|1996–2016
Kevin Durant*|32,597|2007–
Michael Jordan|32,292|1984–2003
Dirk Nowitzki|31,560|1998–2019
Wilt Chamberlain|31,419|1959–1973
James Harden*|29,339|2009–
Shaquille O’Neal|28,596|1992–2011`, 'Regular season, through 2025–26. Durant passed Jordan in March 2026; Harden passed O’Neal in January 2026.'),
 L('Career rebounds', ['Player','Rebounds','Years'], `
Wilt Chamberlain|23,924|1959–1973
Bill Russell|21,620|1956–1969
Kareem Abdul-Jabbar|17,440|1969–1989
Elvin Hayes|16,279|1968–1984
Moses Malone|16,212|1976–1995
Tim Duncan|15,091|1997–2016
Karl Malone|14,968|1985–2004
Robert Parish|14,715|1976–1997
Kevin Garnett|14,662|1995–2016
Dwight Howard|14,627|2004–2022`, 'Regular season, NBA only (Moses Malone’s ABA seasons not included).'),
 L('Career assists', ['Player','Assists','Years'], `
John Stockton|15,806|1984–2003
Chris Paul|12,552|2005–2026
Jason Kidd|12,091|1994–2013
LeBron James*|12,016|2003–
Russell Westbrook*|10,351|2008–
Steve Nash|10,335|1996–2014
Mark Jackson|10,334|1987–2004
Magic Johnson|10,141|1979–1996
Oscar Robertson|9,887|1960–1974
Isiah Thomas|9,061|1981–1994`, 'Regular season, through 2025–26. Westbrook moved into the top 5 in March 2026.'),
 L('Points in a game (every 70-point game)', ['Player','Points','Game'], `
Wilt Chamberlain|100|Warriors vs Knicks, Mar 2, 1962
Bam Adebayo|83|Heat vs Wizards, Mar 10, 2026
Kobe Bryant|81|Lakers vs Raptors, Jan 22, 2006
Wilt Chamberlain|78|Warriors vs Lakers, Dec 8, 1961 (3OT)
Wilt Chamberlain|73|Warriors vs Packers, Jan 13, 1962
Wilt Chamberlain|73|Warriors vs Knicks, Nov 16, 1962
David Thompson|73|Nuggets vs Pistons, Apr 9, 1978
Luka Dončić|73|Mavericks vs Hawks, Jan 26, 2024
Wilt Chamberlain|72|Warriors vs Lakers, Nov 3, 1962
Elgin Baylor|71|Lakers vs Knicks, Nov 15, 1960
David Robinson|71|Spurs vs Clippers, Apr 24, 1994
Donovan Mitchell|71|Cavaliers vs Bulls, Jan 2, 2023 (OT)
Damian Lillard|71|Trail Blazers vs Rockets, Feb 26, 2023
Wilt Chamberlain|70|Warriors vs Nationals, Mar 10, 1963
Devin Booker|70|Suns vs Celtics, Mar 24, 2017
Joel Embiid|70|76ers vs Spurs, Jan 22, 2024`, 'Adebayo also set single-game records for free throws made (36) and attempted (43).')
];
HALL.baseball.leaders = [
 L('Career home runs', ['Player','HR','Years'], `
Barry Bonds|762|1986–2007
Hank Aaron|755|1954–1976
Babe Ruth|714|1914–1935
Albert Pujols|703|2001–2022
Alex Rodriguez|696|1994–2016
Willie Mays|660|1951–1973
Ken Griffey Jr.|630|1989–2010
Jim Thome|612|1991–2012
Sammy Sosa|609|1989–2007
Frank Robinson|586|1956–1976`, 'No active player is within 100 of the top 10.'),
 L('Home runs, season', ['Player','HR','Season'], `
Barry Bonds|73|2001 Giants
Mark McGwire|70|1998 Cardinals
Sammy Sosa|66|1998 Cubs
Mark McGwire|65|1999 Cardinals
Sammy Sosa|64|2001 Cubs
Sammy Sosa|63|1999 Cubs
Aaron Judge|62|2022 Yankees
Roger Maris|61|1961 Yankees
Babe Ruth|60|1927 Yankees
Cal Raleigh|60|2025 Mariners`, 'Raleigh’s 60 in 2025 are the most ever by a catcher. 2026 leaders: Pete Crow-Armstrong and Kyle Schwarber, 45.'),
 L('Career wins, pitcher', ['Player','Wins','Years'], `
Cy Young|511|1890–1911
Walter Johnson|417|1907–1927
Grover Cleveland Alexander|373|1911–1930
Christy Mathewson|373|1900–1916
Pud Galvin|365|1875–1892
Warren Spahn|363|1942–1965
Kid Nichols|361|1890–1906
Greg Maddux|355|1986–2008
Roger Clemens|354|1984–2007
Tim Keefe|342|1880–1893`)
];
HALL.hockey.leaders = [
 L('Career goals', ['Player','Goals','Years'], `
Alex Ovechkin*|929|2005–
Wayne Gretzky|894|1979–1999
Gordie Howe|801|1946–1980
Jaromír Jágr|766|1990–2018
Brett Hull|741|1986–2006
Marcel Dionne|731|1971–1989
Phil Esposito|717|1963–1981
Mike Gartner|708|1979–1998
Mark Messier|694|1979–2004
Steve Yzerman|692|1983–2006`, 'Regular season, through 2025–26.'),
 L('Career points', ['Player','Points','Years'], `
Wayne Gretzky|2,857|1979–1999
Jaromír Jágr|1,921|1990–2018
Mark Messier|1,887|1979–2004
Gordie Howe|1,850|1946–1980
Ron Francis|1,798|1981–2004
Marcel Dionne|1,771|1971–1989
Sidney Crosby*|1,761|2005–
Steve Yzerman|1,755|1983–2006
Mario Lemieux|1,723|1984–2006
Alex Ovechkin*|1,687|2005–`, 'Regular season, through 2025–26. Crosby passed Dionne for 6th in November 2026.'),
 L('Goals, season', ['Player','Goals','Season'], `
Wayne Gretzky|92|1981–82 Oilers
Wayne Gretzky|87|1983–84 Oilers
Brett Hull|86|1990–91 Blues
Mario Lemieux|85|1988–89 Penguins
Phil Esposito|76|1970–71 Bruins
Alexander Mogilny|76|1992–93 Sabres
Teemu Selänne|76|1992–93 Jets
Wayne Gretzky|73|1984–85 Oilers
Brett Hull|72|1989–90 Blues
Wayne Gretzky|71|1982–83 Oilers
Jari Kurri|71|1984–85 Oilers`, 'Selänne’s 76 are the rookie record.')
];
HALL.soccer.leaders = [
 L('Premier League career goals', ['Player','Goals','Seasons'], `
Alan Shearer|260|1992–2006
Harry Kane|213|2012–2023
Wayne Rooney|208|2002–2018
Mohamed Salah|192|2014–2026
Andrew Cole|187|1993–2008
Sergio Agüero|184|2011–2021
Frank Lampard|177|1995–2015
Thierry Henry|175|1999–2012
Robbie Fowler|163|1993–2009
Jermain Defoe|162|2001–2019`, 'Salah left Liverpool after 2025–26. Single-season record: Erling Haaland, 36 (2022–23).'),
 L('Champions League career goals', ['Player','Goals','Clubs'], `
Cristiano Ronaldo|140|Man United, Real Madrid, Juventus
Lionel Messi|129|Barcelona, Paris Saint-Germain
Robert Lewandowski*|109|Dortmund, Bayern, Barcelona
Karim Benzema|90|Lyon, Real Madrid
Kylian Mbappé*|73|Monaco, Paris Saint-Germain, Real Madrid
Raúl|71|Real Madrid, Schalke`, 'Champions League era (from 1992–93), excluding qualifying rounds, per UEFA in late 2026.')
];
HALL.tennis.leaders = [
 L('Grand Slam singles titles, men', ['Player','Titles','Span'], `
Novak Djokovic|24|2008–2023
Rafael Nadal|22|2005–2022
Roger Federer|20|2003–2018
Pete Sampras|14|1990–2002
Roy Emerson|12|1961–1967
Björn Borg|11|1974–1981
Rod Laver|11|1960–1969
Bill Tilden|10|1920–1930
Andre Agassi|8|1992–2003
Jimmy Connors|8|1974–1983
Ivan Lendl|8|1984–1990
Fred Perry|8|1933–1936
Ken Rosewall|8|1953–1972`, 'All eras. Active leaders: Carlos Alcaraz 7, Jannik Sinner 5.'),
 L('Grand Slam singles titles, women', ['Player','Titles','Span'], `
Margaret Court|24|1960–1973
Serena Williams|23|1999–2017
Steffi Graf|22|1987–1999
Helen Wills Moody|19|1923–1938
Chris Evert|18|1974–1986
Martina Navratilova|18|1978–1990
Billie Jean King|12|1966–1975
Maureen Connolly|9|1951–1954
Monica Seles|9|1990–1996
Molla Mallory|8|1915–1926
Suzanne Lenglen|8|1919–1926`, 'All eras. Lenglen also won four French titles before 1925, when the event was open only to French club members. Active leader: Venus Williams 7, then Iga Świątek 6.')
];
HALL.mma.leaders = [
 L('Career marks', ['Mark','Holder','Total'], `
Most UFC wins|Jim Miller|28
Most UFC finishes|Charles Oliveira|21
Most UFC submission wins|Charles Oliveira|17
Longest UFC win streak|Islam Makhachev|17
Most consecutive UFC title defenses|Demetrious Johnson|11
Most heavyweight boxing title defenses|Joe Louis|25`, 'UFC figures as of October 2026.')
];

