import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as AdActions from '../actions/ad.actions';
import { AdService } from '../../core/models/services';

@Injectable()
export class AdEffects {
    constructor(
        private actions$: Actions,
        private adService: AdService
    ) { }

    loadAds$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdActions.loadAds),
            mergeMap(() =>
                this.adService.getAds().pipe(
                    map((ads: any) => AdActions.loadAdsSuccess({ ads })),
                    catchError(error => of(AdActions.loadAdsFailure({ error: error.message })))
                )
            )
        )
    );


    createAd$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdActions.createAd),
            mergeMap(({ ad }) =>
                this.adService.createAd(ad).pipe(
                    map((newAd: any) => AdActions.createAdSuccess({ ad: newAd })),
                    catchError(error => of(AdActions.loadAdsFailure({ error: error.message })))
                )
            )
        )
    );

}