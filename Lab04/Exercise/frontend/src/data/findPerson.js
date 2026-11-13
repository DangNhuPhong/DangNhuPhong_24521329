export function findPerson(people, id) {
  return people.find((person) => person.id === id);
}
