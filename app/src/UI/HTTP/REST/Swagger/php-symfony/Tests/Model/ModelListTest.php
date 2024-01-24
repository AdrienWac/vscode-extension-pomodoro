<?php
/**
 * ModelListTest
 *
 * PHP version 8.1.1
 *
 * @category Class
 * @package  App\UI\HTTP\REST\Tests\Model
 * @author   openapi-generator contributors
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
 * Please update the test case below to test the model.
 */

namespace App\UI\HTTP\REST\Tests\Model;

use App\UI\HTTP\REST\Model\ModelList;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/**
 * ModelListTest Class Doc Comment
 *
 * @category    Class
 * @description ModelList
 * @package     App\UI\HTTP\REST\Tests\Model
 * @author      openapi-generator contributors
 * @link        https://github.com/openapitools/openapi-generator
 * @coversDefaultClass \App\UI\HTTP\REST\Model\ModelList
 */
class ModelListTest extends TestCase
{
    protected ModelList|MockObject $object;

    /**
     * Setup before running any test case
     */
    public static function setUpBeforeClass(): void
    {
    }

    /**
     * Setup before running each test case
     */
    public function setUp(): void
    {
        $this->object = $this->getMockBuilder(ModelList::class)->getMockForAbstractClass();
    }

    /**
     * Clean up after running each test case
     */
    public function tearDown(): void
    {
    }

    /**
     * Clean up after running all test cases
     */
    public static function tearDownAfterClass(): void
    {
    }

    /**
     * @group integration
     * @small
     */
    public function testTestClassExists(): void
    {
        $this->assertTrue(class_exists(ModelList::class));
        $this->assertInstanceOf(ModelList::class, $this->object);
    }

    /**
     * Test attribute "name"
     *
     * @group unit
     * @small
     */
    public function testPropertyName(): void
    {
        $this->markTestSkipped('Test for property name not implemented');
    }
}
