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

    const CODE_ERROR = 400;

    public function validate(PostItemRequest $postItemRequest)
    {
        $validator = Validation::createValidator();
        $this->violations = $validator->validate($postItemRequest->getTitle(), [
            new NotBlank(),
            new Length(['min' => 50])
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
            $errorMessage .= "An error has occurred on the property {$violation->getPropertyPath()}. {$violation->getMessage()}.";
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