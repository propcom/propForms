# PropForms

[![NPM](https://img.shields.io/npm/v/propforms.svg)](https://www.npmjs.com/package/propforms) ![Size](https://img.shields.io/bundlephobia/minzip/propforms.svg) ![License](https://img.shields.io/npm/l/propforms.svg) ![Downloads](https://img.shields.io/npm/dw/propforms.svg)

## Installation

PropForms is simple to install, just run one of the following commands:

    npm install propforms | yarn add propforms
    
## Usage

To get started you will need to import `PropForms` into your `.js` file with the following import statement:

    import { PropForms } from "propforms"
    
## Initialisation

To initialise PropForms on a form simply do the following:

    const form = document.getElementById("my-form")
    const instance = new PropForms(form)
    
> Note: By default PropForms will attempt to validate all form elements marked with the `required` html attribute on submission.    

## Types

There are a number of custom types used in PropForms, they're documented here and referenced to throughout this readme file.

#### `Validation`

    {
        code: number
        method: () => boolean    
    }
    
#### `Ajax`

    interface {
        (form: HTMLFormElement, options: Options, validation: PropFormsValidation)
        send(): void   
    }
    
#### `Error`

    {
        code: number
        field?: HTMLTextAreaElement | ?HTMLInputElement | ?HTMLTextAreaElement
        fields?: NodeList<HTMLElement>
        name: string
        message: string
        type: string
        passing: boolean
    }
    
    
#### `Success`

    {
        form: HTMLFormElement
        message: string
    }
    
#### `Valid`

    {
        field: ?HTMLTextAreaElement | ?HTMLInputElement | ?HTMLTextAreaElement
        fields: ?NodeList<HTMLElement>
        parent: ?Element
        name: string
    }

## Options

PropForms also accepts a number of options for a second parameter, they are, with their default values as follows:

    const options = {
        parent: undefined,
        errorClass: "propforms--error",
        minLengths: {
            text: 2,
            email: 6,
            tel: 6,
            password: 6
        },
        messages: {
            0: "Please fill out this field correctly",
            1: "Please enter at least {n} characters",
            2: "Please enter a valid email address",
            3: "Please check this box to continue",
            4: "Please select at least one option",
            5: "Please select an option",
            6: "Server validation error",
            success: "Thank you, we will be in touch soon."
        },
        validation: {},
        ajax: PropForms_ajax
    }

#### `parent: string`

The `parent` option is an optional css class which will also get the error classes applied to it if the form errors. 

Example:

    parent: "myParent--class"

---

#### `errorClass: string`

The `errorClass` option denotes the css class that will be added onto the required field if validation fails.

Example:

    errorClass: "myError--class"

---

#### `minLengths: { [key: string]: number }`

The key in this object refers to the `input type` and the value is the minimum length the value in the field needs to be before it passes validation.

Example:

    minLengths: {
        file: 1
    }
 
---
 
#### `messages: { [key: string | number]: string }` 
 
When an error event is thrown then it will have a corresponding error code, this option allows you to configure the messages that are shown for each error code, this option works in conjunction with the `validation` option to provide custom validation.
 
Example:
 
    messages: {
        0: "You should really fill this field out correctly..."
    }
    
---
    
#### `validation: { [key: string]: Validation }`
 
The validation object allows you to pass through custom validation methods for any custom validation you wish to do that isn't supported out the box. 
 
> Note: The `key` of your `Validation` object references the field `name`
 
Example:
 
    validation: {
        postcode: {
            code: 10,
            method: function() => {
                return isNear(this.value)
            }
        }
    } 
    
The above example will pass the value of the input with the name `postcode` to the `isNear` function, which will return either true or false. The `this` keyword refers to the input element.

---

#### `ajax: Ajax | null`

Setting the `ajax` option to `null` will disable Ajax functionality, if you wish to do your own Ajax implementation then you will need to create a class that implements the `Ajax` interface documented under [Types](#types). Passing your own implementation to this option is fairly experimental, use with caution.

## Events

In addition to the the options you can also customise PropForms by listening for events on the html `form` element. A number of events are fired throughout the lifecycle of the class, they are all documented below.

##### Supported Events: `error`, `fielderror`, `fieldvalid`, `success`, `send`

Events are easily added to the form in the following manner:

    const form = document.getElementById("my-form")
    const instance = new PropForms(form)
    
    form.addEventListener("fielderror", e => {
        console.log(e.detail)
    })
    
The event object emitted when the event is fired contains additional information under the `detail` property.

#### `error: Error`

The `error` event will fire if the form errors for any reason.

> Note: `e.detail` contains an [`Error`](#types) type.

---

#### `fielderror: Error`

The `fielderror` event will fire for each individual field that has encountered an error.

> Note: `e.detail` contains an [`Error`](#types) type.

---

#### `fieldvalid: Valid`

The `fieldvalid` event will fire for each individual field that passes validation. 

> Note: `e.detail` contains an [`Valid`](#types) type.

---

#### `success: Success`

The `success` event will fire after the form has received a success message from the server.

> Note: `e.detail` contains an [`Success`](#types) type.

## Public Methods

PropForms has a number of public methods you can call do interact with it programmatically. All of the methods can be invoked in the following manner:

        const form = document.getElementById("my-form")
        const instance = new PropForms(form)
        
        isntance.method()
        
### Methods

#### `enable()`

Enable will enable the form if it is disabled, an enabled form functions are normal.

#### `disable()`

This method will disabled the form, a disabled form has a reduced opacity and will not be interactive.

#### `getErrors(): Errors`

This method will return all the errors PropForms currently has.

#### `submit()`

This will submit the form for you.

#### `validate()`

Validate the form.

#### `setAjax(enabled: boolean = true)`

Enables/disables ajax depending on the value passed.