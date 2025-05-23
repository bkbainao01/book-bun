import { seedBooks } from './seeds/books.seed.ts';
import { seedUsers } from './seeds/users.seed.ts';
// import { seedRoles } from './seeds/role.seed';
// import { seedSettings } from './seeds/setting.seed';

async function main() {
  console.log('🌱 Seeding started...');
  
//   await seedRoles();
  await seedUsers();
//   await seedSettings();
  await seedBooks();
  console.log('✅ Seeding completed');
}

main().catch((e) => {
  console.error('❌ Seed error:', e);
  process.exit(1);
});


