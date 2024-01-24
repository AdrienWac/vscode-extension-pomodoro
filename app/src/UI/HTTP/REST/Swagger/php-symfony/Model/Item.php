<?php
/**
 * Item
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
 * Class representing the Item model.
 *
 * @package App\UI\HTTP\REST\Model
 * @author  OpenAPI Generator team
 */

class Item 
{
        /**
     * Title of item
     *
     * @var string|null
     * @SerializedName("title")
     * @Assert\NotNull()
     * @Assert\Type("string")
     * @Type("string")
     */
    protected ?string $title = null;

    /**
     * @var string|null
     * @SerializedName("description")
     * @Assert\Type("string")
     * @Type("string")
     */
    protected ?string $description = null;

    /**
     * @var ModelList|null
     * @SerializedName("list")
     * @Assert\NotNull()
     * @Assert\Valid()
     * @Assert\Type("App\UI\HTTP\REST\Model\ModelList")
     * @Type("App\UI\HTTP\REST\Model\ModelList")
     */
    protected ?ModelList $list = null;

    /**
     * @var \DateTime|null
     * @SerializedName("createdAt")
     * @Assert\NotNull()
     * @Assert\Type("\DateTime"))
     * @Type("DateTime")
     */
    protected ?\DateTime $createdAt = null;

    /**
     * Constructor
     * @param array|null $data Associated array of property values initializing the model
     */
    public function __construct(array $data = null)
    {
        if (is_array($data)) {
            $this->title = array_key_exists('title', $data) ? $data['title'] : $this->title;
            $this->description = array_key_exists('description', $data) ? $data['description'] : $this->description;
            $this->list = array_key_exists('list', $data) ? $data['list'] : $this->list;
            $this->createdAt = array_key_exists('createdAt', $data) ? $data['createdAt'] : $this->createdAt;
        }
    }

    /**
     * Gets title.
     *
     * @return string|null
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }



    /**
     * Sets title.
     *
     * @param string|null $title  Title of item
     *
     * @return $this
     */
    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Gets description.
     *
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }



    /**
     * Sets description.
     *
     * @param string|null $description
     *
     * @return $this
     */
    public function setDescription(?string $description = null): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Gets list.
     *
     * @return ModelList|null
     */
    public function getList(): ?ModelList
    {
        return $this->list;
    }



    /**
     * Sets list.
     *
     * @param ModelList|null $list
     *
     * @return $this
     */
    public function setList(?ModelList $list): self
    {
        $this->list = $list;

        return $this;
    }

    /**
     * Gets createdAt.
     *
     * @return \DateTime|null
     */
    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }



    /**
     * Sets createdAt.
     *
     * @param \DateTime|null $createdAt
     *
     * @return $this
     */
    public function setCreatedAt(?\DateTime $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}


