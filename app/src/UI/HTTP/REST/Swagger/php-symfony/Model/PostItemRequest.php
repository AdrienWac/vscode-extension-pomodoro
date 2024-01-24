<?php
/**
 * PostItemRequest
 *
 * PHP version 8.1.1
 *
 * @category Class
 * @package  App\UI\HTTP\REST\Model
 * @author   OpenAPI Generator team
 * @link     https://github.com/openapitools/openapi-generator
 */

/**
 * API REST Todo - OpenAPI 3.0
 *
 * Spec API pour le projet Todo.
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 * Generated by: https://github.com/openapitools/openapi-generator.git
 *
 */

/**
 * NOTE: This class is auto generated by the openapi generator program.
 * https://github.com/openapitools/openapi-generator
 * Do not edit the class manually.
 */

namespace App\UI\HTTP\REST\Model;

use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Type;
use JMS\Serializer\Annotation\Accessor;
use JMS\Serializer\Annotation\SerializedName;

/**
 * Class representing the PostItemRequest model.
 *
 * @package App\UI\HTTP\REST\Model
 * @author  OpenAPI Generator team
 */

class PostItemRequest 
{
        /**
     * @var Item|null
     * @SerializedName("item")
     * @Assert\NotNull()
     * @Assert\Valid()
     * @Assert\Type("App\UI\HTTP\REST\Model\Item")
     * @Type("App\UI\HTTP\REST\Model\Item")
     */
    protected ?Item $item = null;

    /**
     * Constructor
     * @param array|null $data Associated array of property values initializing the model
     */
    public function __construct(array $data = null)
    {
        if (is_array($data)) {
            $this->item = array_key_exists('item', $data) ? $data['item'] : $this->item;
        }
    }

    /**
     * Gets item.
     *
     * @return Item|null
     */
    public function getItem(): ?Item
    {
        return $this->item;
    }



    /**
     * Sets item.
     *
     * @param Item|null $item
     *
     * @return $this
     */
    public function setItem(?Item $item): self
    {
        $this->item = $item;

        return $this;
    }
}


