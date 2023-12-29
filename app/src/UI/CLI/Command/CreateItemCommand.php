<?php

namespace App\UI\CLI\Command;

use App\Application\Controller\ControllerCollectionInterface;
use App\Application\Controller\ControllerInterface;
use App\Application\Controller\CreateItemInterface;
use App\Application\Controller\PostItemSymfonyCliController;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'item:create-item',
    description: 'Create item for todo',
    aliases: ['item:create-item']
)]
class CreateItemCommand extends Command
{

    protected ControllerInterface $postItemController;

    public function __construct(ControllerCollectionInterface $controllerCollection)
    {
        $this->postItemController = $controllerCollection->getController(PostItemSymfonyCliController::SERVICE_TAG_INDEX);
        parent::__construct();
    }

    protected function configure(): void
    {
        // $this
        //     ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
        //     ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        // ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $questionHelper = $this->getHelper('question');

        $question = new Question('Please enter the title of the item: ', 'Item #1');

        $itemTitle = $questionHelper->ask($input, $output, $question);

        $question = new Question('Please enter the description of the item: ', 'Lorem Ipsum');

        $itemDescription = $questionHelper->ask($input, $output, $question);

        $io = new SymfonyStyle($input, $output);
        
        $io->note(sprintf('Title: %s ', $itemTitle));

        $io->note(sprintf('Description: %s ', $itemDescription));

        $postItemRequestSymfonyCli = new PostItemRequestSymfonyCliModel(title: $itemTitle, description: $itemDescription);

        $this->postItemController->create($postItemRequestSymfonyCli);

        // $io->horizontalTable(['Title', 'Description'], [$itemTitle, $itemDescription]);

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }
}
