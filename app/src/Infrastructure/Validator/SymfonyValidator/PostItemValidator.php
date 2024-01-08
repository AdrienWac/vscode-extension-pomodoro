<?php

namespace App\Infrastructure\Validator\SymfonyValidator;

use App\Domain\Entity\PostItemRequest;
use App\Domain\Error;
use PostItemValidatorInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Validation;


class PostItemValidator implements PostItemValidatorInterface
{

    protected ConstraintViolationListInterface $violations;

    public function validate(PostItemRequest $postItemRequest)
    {
        $validator = Validation::createValidator();
        $this->violations = $validator->validate($postItemRequest->getTitle(), [
            new NotBlank(),
            new Length(['min' => 50])
        ]);
    }

    /**
     * Transforme les violations en tableau d'objet Error du Domaine
     *
     * @return Error[] 
     */
    public function getErrors(): array
    {
        return [];
    }
}