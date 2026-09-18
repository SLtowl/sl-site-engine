// Coordinates are measured in the accepted source image (1672 × 941).
// Each contour follows the entire visible object, including its metal bevel.
// Foreground objects are subtracted before dimming a plaque behind them.
export const sceneSize = { width: 1672, height: 941 };

export const plaqueContours = [
  {
    id: 'velora',
    d: 'M 117 207 C 108 205 89 211 88 227 L 79 480 Q 78 499 94 504 L 488 537 Q 503 538 504 523 L 506 282 Q 506 269 494 265 Z',
    occludedBy: ['workshop'],
  },
  {
    id: 'horizon',
    d: 'M 551 168 L 862 200 Q 875 201 875 214 L 875 384 Q 875 397 861 398 L 543 380 Q 528 379 528 364 L 532 184 Q 532 169 551 168 Z',
  },
  {
    id: 'monolith',
    d: 'M 919 143 L 1223 91 Q 1241 88 1243 106 L 1244 304 Q 1244 319 1230 323 L 922 357 Q 904 357 904 341 L 905 160 Q 905 146 919 143 Z',
  },
  {
    id: 'ember',
    d: 'M 1289 143 L 1584 84 Q 1605 80 1608 101 L 1609 285 Q 1610 301 1597 306 L 1293 345 Q 1275 345 1275 330 L 1274 160 Q 1274 147 1289 143 Z',
  },
  {
    id: 'workshop',
    d: 'M 495 403 L 774 427 Q 788 428 788 443 L 784 634 Q 784 651 769 651 L 487 637 Q 472 636 472 621 L 477 420 Q 477 404 495 403 Z',
    occludedBy: ['wanderly'],
  },
  {
    id: 'voltis',
    d: 'M 824 401 L 1170 359 Q 1189 356 1191 373 L 1191 574 Q 1191 589 1177 592 L 820 616 Q 803 617 803 601 L 807 419 Q 807 405 824 401 Z',
  },
  {
    id: 'sonicflow',
    d: 'M 1246 378 L 1537 336 Q 1560 333 1565 353 L 1568 558 Q 1569 573 1553 578 L 1249 602 Q 1230 603 1230 587 L 1230 395 Q 1230 381 1246 378 Z',
  },
  {
    id: 'wanderly',
    d: 'M 182 567 L 505 610 Q 521 612 521 629 L 517 817 Q 517 834 504 834 L 165 809 Q 148 808 149 792 L 158 586 Q 158 570 182 567 Z',
  },
  {
    id: 'forma',
    d: 'M 874 642 L 1186 615 Q 1210 612 1214 632 L 1207 828 Q 1206 848 1188 849 L 864 835 Q 849 835 850 821 L 860 659 Q 861 644 874 642 Z',
  },
  {
    id: 'pixel-form',
    d: 'M 1267 629 L 1592 587 Q 1614 585 1617 605 L 1619 819 Q 1619 836 1602 839 L 1267 841 Q 1250 841 1251 824 L 1252 647 Q 1252 633 1267 629 Z',
  },
];
