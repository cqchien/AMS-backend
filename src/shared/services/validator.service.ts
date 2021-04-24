import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorService {
    public isImage(mimeType: string): boolean {
        const imageMimeTypes = ['image/jpeg', 'image/png'];

        return imageMimeTypes.includes(mimeType);
    }

    public isDesktopAccess(): boolean {
        let check = false;
        if (window.innerWidth > 768) {
            check = true;
        }
        return check;
    }
}
