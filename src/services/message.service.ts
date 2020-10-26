import toastr from 'toastr';

export class MessageService {
    private readonly instance = toastr;

    constructor() {
        toastr.options = {
            closeButton: true,
            newestOnTop: true,
            progressBar: true,
            timeOut: 5000,
        };

        this.instance = toastr;
    }

    public error(message: string, title: string = 'Error'): void {
        this.instance.error(message, title, {
            tapToDismiss: true,
        });
    }

    public success(message: string, title: string = 'Succuss'): void {
        this.instance.success(message, title, {
            closeButton: false,
            progressBar: false,
            timeOut: 3000,
        });
    }
}

export const messageService = new MessageService();
