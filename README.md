# eventbridge-toolbox-schema-generator

Eventbridge Toolbox Schema Generator is cli tool that automates the initial creation of a schema registry in your documentation of your event-driven architecture.

This is designed to work with the [eventbridge-toolbox](https://github.com/aleios-cloud/eventbridge-toolbox) package.

## Eventbridge Contracts

Within event-driven architectures, events facilitate communication between loosely connected services in an application. EventBridge is AWS's tool for implementing asynchronous event-driven workflows.

Event emitters are responsible for broadcasting events to event channels, while event consumers are responsible for executing business logic whenever they encounter a relevant event.

EventBridge contracts ensure a stable and reliable interaction emitters and consumers. These contract acts as a guiding agreement which guarantees that emitters' published events will consistently trigger the corresponding business logic on the consumer side.

## Key Features

- Generate documentation skeletons for events
- Generate json schemas for events from contracts

## Getting Started

### Prerequisites

### Installation

With npm:

```
npm install --save-dev @aleios-cloud/eventbridge-toolbox-schema-generator
```

With yarn:

```
yarn add -D @aleios-cloud/eventbridge-toolbox-schema-generator
```

With pnpm:

```
pnpm add -D @aleios-cloud/eventbridge-toolbox-schema-generator
```

### Usage

You can create a documentation website based on [eventcatalog.dev](https://www.eventcatalog.dev/) and generate docs directly from your event contracts.

1. Set up an event catalog site and give it a name:

```
npx @eventcatalog/create-eventcatalog@latest <name your event catalog>
```

2. Edit `eventcatalog.config.js` with your details

3. Remove the example events from the `events` folder, as well as everything in the `services` and `domains` folders

4. Run `eventbridge-toolbox-schema-generator` with the following arguments:

- The path from the root to your event contracts
- The path from the root to the event catalog events folder

```
npx schema-generator <path from root to your event contracts> <path from root to event catalog events>
```

5. You can start a local development server by running:

```
npm run dev
```

6. You can find out more about how to deploy your documentation site in the [event catalog docs](https://www.eventcatalog.dev/docs/guides/deployment)

## Contributors

<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td valign="top"><a href="https://github.com/RyanT5"><img src="https://avatars.githubusercontent.com/u/22382958?v=4" width="100px;" alt="Ryan Schuller"/><br /><sub><b>Ryan Schuller</b></sub></a></td>
      <td valign="top"><a href="https://github.com/lukey-aleios"><img src="https://avatars.githubusercontent.com/u/93375669?v=4" width="100px;" alt="Luke Yianni"/><br /><sub><b>Luke Yianni</b></sub></a></td>
      <td valign="top"><a href="https://github.com/april-bates-aleios"><img src="https://avatars.githubusercontent.com/u/124585201?v=4" width="100px;" alt="April Bates"/><br /><sub><b>April Bates</b></sub></a></td>
    </tr>
  </tbody>
</table>
<!-- markdownlint-restore -->
