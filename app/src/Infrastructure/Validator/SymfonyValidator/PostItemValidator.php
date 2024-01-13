<?php

namespace App\Infrastructure\Validator\SymfonyValidator;

use App\Domain\Entity\Error;
use App\Domain\Entity\PostItemRequest;
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
        if (!$this->hasErrors()) {
            return [];   
        }

        $arrayErrorsForDomain = [];
        foreach ($this->violations as $violation) {
            $arrayErrorsForDomain[] = new Error(400, $violation->getMessage());
        }

        return $arrayErrorsForDomain;
    }

    /**
     * Return if error has present
     *
     * @return boolean True if error is present. Otherwise false.
     */
    public function hasErrors(): bool
    {
        return count($this->violations) !== 0;
    }
}