export function generateFixtures(teams) {
  if (!Array.isArray(teams) || teams.length !== 5 || teams.some(team => team.players.length !== 5)) throw new Error('Complete all 5 team rosters before entering the arena.')
  const fixtures = []
  for (let i = 0; i < teams.length; i++) for (let j = i + 1; j < teams.length; j++) {
    const n = fixtures.length + 1
    fixtures.push({ id: `${teams[i].id}-${teams[j].id}`, matchNumber: n, team1: teams[i].id, team2: teams[j].id, status: 'UPCOMING', date: `DAY ${Math.ceil(n / 2)} · ${n % 2 ? '18:00' : '19:30'}`, arena: `ARENA ${String((n % 3) + 1).padStart(2, '0')}` })
  }
  return fixtures
}
