<?php

namespace App\UI\CLI\Command;

use App\Application\Controller\ControllerCollectionInterface;
use App\Application\Controller\ControllerInterface;
use App\Application\Controller\CreateItemInterface;
use App\Application\Controller\PostItemSymfonyCliController;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\Table;
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

        $postItemSymfonyCliViewModel = $this->postItemController->create($postItemRequestSymfonyCli);

        $table = new Table($output);
        $table
            ->setHeaders(['ISBN', 'Title', 'Author'])
            ->setRows([
                ['99921-58-10-7', 'Divine Comedy', 'Dante Alighieri'],
                ['9971-5-0210-0', 'A Tale of Two Cities', 'Charles Dickens'],
                ['960-425-059-0', 'The Lord of the Rings', 'J. R. R. Tolkien'],
                ['80-902734-1-6', 'And Then There Were None', 'Agatha Christie'],
            ])
        ;
        $table->render();

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }
}
