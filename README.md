# Playwright & Payment Element integration test demo

## Installation and running this demo

### Create a .env file

In the root of the project:

```
cp .env.sample .env
```

In `.env` copy your secret and publishable key from your test Stripe account.

```
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

### Install dependencies

```
npm install
```

### Run the tests

```
npx playwright test
```

In debug mode:

```
npx playwright test --debug
```
