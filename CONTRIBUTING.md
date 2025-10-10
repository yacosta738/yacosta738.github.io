# Contributing

All contributions to this project are welcome.

When contributing to this repository, please first discuss the change you wish to
make via an issue on the repository.

Note: we have a [code of conduct](./CODE_OF_CONDUCT.md), please follow it in all
your interactions with the project.

## Setting up the project

To set up the project, you need to have [Node.js](https://nodejs.org/en/) and
[pnpm](https://pnpm.io/) installed.

1. Fork the repository.
2. Clone the repository to your local machine.
3. Install the dependencies by running `pnpm install`.
4. Create a new branch for your changes.

## Making changes

When making changes, please follow the coding style of the project.

- Run `pnpm run check` to check for any errors.
- Run `pnpm run dev` to start the development server.

## AI Assistant Instructions (Ruler)

This project uses [Ruler](https://github.com/intellectronica/ruler) to centralize
and manage the instructions provided to AI coding assistants like GitHub Copilot,
Gemini, and others. This ensures that all assistants work with the same context,
conventions, and project architecture, which are defined in the `.ruler/`
directory.

### How to Apply AI Instructions

After cloning the project or pulling new changes, you must synchronize the AI
instructions. To do this, run the following command in the root of the project:

```bash
 npx @intellectronica/ruler apply
```

This command reads all the instruction files from the `.ruler/` directory and
automatically generates the necessary configuration for the different AI tools
supported by the project.

If you need to modify or add instructions for the AIs, edit the relevant Markdown
files (`.md`) inside the `.ruler/` directory and run the `ruler apply` command
again to distribute the changes.

## Submitting changes

When you are ready to submit your changes, please follow these steps:

1. Push your changes to your forked repository.
2. Create a new pull request.
3. Make sure that your pull request follows the [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/).
