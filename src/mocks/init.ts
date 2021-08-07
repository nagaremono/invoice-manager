import { PrismaClient, Product, User } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  for (const {
    tablename,
  } of await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$queryRaw(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        );
      } catch (err) {
        console.error(err);
      }
    }
  }
  const salesPersonRole = await prisma.role.create({
    data: {
      name: 'sales_person',
    },
  });
  const customerRole = await prisma.role.create({
    data: {
      name: 'customer',
    },
  });

  const salesPersons: User[] = [];
  const customers: User[] = [];

  for (let i = 0; i < 10; i++) {
    const newSalesPerson = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.userName(),
        RoleGroup: {
          create: [
            {
              role: {
                connect: {
                  id: salesPersonRole.id,
                },
              },
            },
          ],
        },
      },
    });
    salesPersons.push(newSalesPerson);
  }

  for (let i = 0; i < 100; i++) {
    const newCustomer = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.userName(),
        RoleGroup: {
          create: [
            {
              role: {
                connect: {
                  id: customerRole.id,
                },
              },
            },
          ],
        },
      },
    });
    customers.push(newCustomer);
  }

  const products: Product[] = [];

  for (let i = 0; i < 1000; i++) {
    const newProduct = await prisma.product.create({
      data: {
        manufacturer:
          faker.company.companyName() + ' ' + faker.company.companySuffix(),
        name: faker.commerce.productName(),
        pictures: [faker.random.image()],
        price: BigInt(parseFloat(faker.commerce.price(5e3, 1e6, 2)) * 100),
        stock: faker.datatype.number(1000),
      },
    });
    products.push(newProduct);
  }

  for (let i = 0; i < 1000; i++) {
    const prd = products[getRandomInt(0, products.length)];
    const boughtQuantity = getRandomInt(1, prd.stock);
    await prisma.invoice.create({
      data: {
        currency: 'IDR',
        totalAmount: prd.price * BigInt(boughtQuantity),
        amountPaid: prd.price * BigInt(boughtQuantity),
        customer: {
          connect: { id: customers[getRandomInt(0, customers.length)].id },
        },
        salesPerson: {
          connect: {
            id: salesPersons[getRandomInt(0, salesPersons.length)].id,
          },
        },
        soldItem: {
          create: {
            currency: 'IDR',
            manufacturer: prd.manufacturer,
            name: prd.name,
            pictures: prd.pictures,
            priceEach: prd.price,
            quantity: boughtQuantity,
          },
        },
      },
    });
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

main()
  .then(() => console.log('success'))
  .catch((err) => console.error(err));
