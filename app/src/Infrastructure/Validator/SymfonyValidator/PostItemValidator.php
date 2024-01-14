<?php

namespace App\Infrastructure\Validator\SymfonyValidator;

use App\Domain\Entity\Error;
use App\Domain\Entity\HTTPCodeEnum;
use App\Domain\Entity\PostItemRequest;
use App\Domain\SPI\Validator\PostItemValidatorInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Validation;


class PostItemValidator implements PostItemValidatorInterface
{
    protected ConstraintViolationListInterface $violations;

    /**
     * Instanciate new Validator from symfony component
     * Add contrainst of validation on property of PostItemRequest Domain object.
     * Then validate object and save violations.
     * 
     * @param PostItemRequest $postItemRequest
     * @return void
     * @todo Trouver un pattern plus propre pour cette fonctionnalité. Eviter d'avoir à 
     * modifier cette méthode à chaque fois qu'on a un nouveau champ ou une nouvelle règle de validation
     * métier.
     */
    public function validate(PostItemRequest $postItemRequest)
    {
        $validator = Validation::createValidator();
        $this->violations = $validator->validate($postItemRequest->getTitle(), [
            new NotBlank(),
            new Length(['min' => 50, 'minMessage' => 'The property Title value {{ value }} is too short.'])
        ]);
    }

    /**
     * Transforms violations into Domain Error object
     * If errors, create message for each violations.
     * Create object Error with concatenate message violation
     * and use http error code from HTTPCodeEnum.
     *
     * @return Error|null Null if no error. Otherwise Error object.
     */
    public function getError(): ?Error
    {
        if (!$this->hasErrors()) {
            return null;   
        }

        $errorMessage = '';
        foreach ($this->violations as $violation) {
            $errorMessage .= $violation->getMessage();
        }

        return new Error(
            HTTPCodeEnum::HTTP_UNPROCESSABLE_ENTITY->value, 
            $errorMessage
        );
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