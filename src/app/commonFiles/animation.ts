import { animate, animation, keyframes, query, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';


export let imgAnimation= trigger('openClose', [
  state('open', style({
    height: '200px',
    opacity: 1,
    backgroundColor: 'yellow'
  })),
  state('close', style({
    height: '100px',
    opacity: 0.5,
    backgroundColor: 'green'
  })),
  // ...
  transition('* => *', [
    animate('0.3s', keyframes ( [
      style({ left: 0 , top:100}),
      style({ left:200 , top:0}),
      // style({ opacity: 1,   offset: 0.5 }),
      // style({ opacity: 0.2, offset: 0.7 })
    ]))
  ])

])

export let actionBtn=trigger('todoItemAdmin',[
  transition(':leave',[
    animate(1000,style({
      opacity:0
    }))
  ])
])

export const SlideEnterAnimation = animation([
  style({ transform: 'translate({{ x }}, {{ y }})' }),
  animate(
    '{{ duration }} cubic-bezier(0.59, 0.32, 0.38, 1.13)',
    style({ transform: 'translate(0)' })
  ),
]);

export const SlideExitAnimation = animation([
  style({ transform: 'translate(0)' }),
  animate(
    '{{ duration }} cubic-bezier(0.59, 0.32, 0.38, 1.13)',
    style({ transform: 'translate({{ x }}, {{ y }})' })
  ),
]);

export const AddItemfadeIn = trigger('addItem', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate(2000)
  ]),
  transition(
    ':leave',
    useAnimation(SlideExitAnimation, {
      params: { x: `${window.innerWidth}px`, y: 0, duration: '1s' },
    })
  ),
]);

export const cartBarAnimation=trigger('slideFadeLeft', [
  transition(
    ':enter',
    animation([
      style({ opacity: 0, height: 0, transform: 'translate(100px, 0)' }),
      animate(
        '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
        style({ opacity: 1, height: '*', transform: 'translate(0, 0)' })
      ),
    ])
  ),
  transition(
    ':leave',
    animation([
      animate(
        '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
        style({ opacity: 0, height: 0, transform: 'translate(100px, 0)' })
      ),
    ])
  ),
])
export const noItemAnimation=trigger('noItem', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(4000)
  ])
]);

export const SlideLeft = trigger('slideLeft', [
  transition(
    ':enter',
    useAnimation(SlideEnterAnimation, {
      params: { x: `-${window.innerWidth}px`, y: 0, duration: '1s' },
    })
  ),
]);

export const FadeIn = trigger('fadeIn', [
  transition(
    ':enter',
    animation([
      style({ opacity: 0 }),
      // animate(
      //   '3000 cubic-bezier(0.59, 0.32, 0.38, 1.13)',
      //   style({ opacity: 1 })
      // ),
      animate(1500, style({ opacity: 0.8 })),
    ])
  ),
]);

export const FadeOut=trigger('fadeOut', [
  transition(
    ':leave',
    animation([
      style({ opacity: 1 }),
      animate(
        '0.8s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
        style({ opacity: 0 })
      ),
    ])
  ),
]);

