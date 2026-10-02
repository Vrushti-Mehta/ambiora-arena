export const emailValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
export const initials = value => value.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'AA'
