export class BaseModal {

    /**
     * Show method: Defines backdrop and makes the modal show
     */
    public static show(element: JQuery<HTMLElement>) {

        element.modal({backdrop: "static"});
        element.modal('show');
    }

    /**
     * Hide method: Closes the modal
     */
    public static hide(element: JQuery<HTMLElement>) {
        element.modal('hide');
    }
}