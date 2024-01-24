# App\UI\HTTP\REST\Api\ItemApiInterface

All URIs are relative to *https://todo.adrienlambert.fr/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createItem**](ItemApiInterface.md#createItem) | **POST** /item | Create item for a list


## Service Declaration
```yaml
# config/services.yaml
services:
    # ...
    Acme\MyBundle\Api\ItemApi:
        tags:
            - { name: "open_api_server.api", api: "item" }
    # ...
```

## **createItem**
> App\UI\HTTP\REST\Model\Item createItem($postItemRequest)

Create item for a list

Create a new item to the list

### Example Implementation
```php
<?php
// src/Acme/MyBundle/Api/ItemApiInterface.php

namespace Acme\MyBundle\Api;

use App\UI\HTTP\REST\Api\ItemApiInterface;

class ItemApi implements ItemApiInterface
{

    // ...

    /**
     * Implementation of ItemApiInterface#createItem
     */
    public function createItem(PostItemRequest $postItemRequest, int &$responseCode, array &$responseHeaders): array|object|null
    {
        // Implement the operation ...
    }

    // ...
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **postItemRequest** | [**App\UI\HTTP\REST\Model\PostItemRequest**](../Model/PostItemRequest.md)| Create a new item in the list |

### Return type

[**App\UI\HTTP\REST\Model\Item**](../Model/Item.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

