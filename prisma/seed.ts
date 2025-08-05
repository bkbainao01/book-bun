import { seedBooks } from './seeds/books.seed.ts';
import { seedUsers } from './seeds/users.seed.ts';
import { seedRoles } from './seeds/role.seed';


async function main() {
  console.log('🌱 Seeding started...');
  await seedBooks();
  await seedRoles();
  await seedUsers();
  console.log('✅ Seeding completed');
}

main().catch((e) => {
  console.error('❌ Seed error:', e);
  process.exit(1);
});


