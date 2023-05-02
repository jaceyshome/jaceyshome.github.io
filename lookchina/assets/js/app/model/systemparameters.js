define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('SystemParameters', [function () {
      return {
        onMapChangingAnimation: false,
        bgSounds: [
          {
            id: 'bgAudio01',
            url: 'assets/audios/bg/01.mp3'
          },
          {
            id: 'bgAudio02',
            url: 'assets/audios/bg/01.mp3'
          },
          {
            id: 'bgAudio03',
            url: 'assets/audios/bg/01.mp3'
          },
          {
            id: 'bgAudio04',
            url: 'assets/audios/bg/01.mp3'
          },
          {
            id: 'bgAudio05',
            url: 'assets/audios/bg/01.mp3'
          },
          {
            id: 'bgAudio06',
            url: 'assets/audios/bg/01.mp3'
          }
        ],
        MAP_Z: 1.5,
        SCALE: 100,
        introAudioState: {
          INIT: 0,
          LOADED: 1,
          PLAYING: 2,
          COMPLETED: 3
        },
        dynastyIntroText: {
          text: '',
          x: 512,
          startY: 605,
          endY: 585,
          fontWeight: 'bold',
          fontFamily: 'PARAGRAPH',
          fontSize: 'INTROTEXT',
          color: 'WHITE',
          textAlign: 'center',
          shadow: {
            color: 'WHITE',
            offsetX: 0.5,
            offsetY: 0.5,
            blur: 10,
            alpha: 0.5
          }
        },
        MAINCANVAS: 0,
        ALPHACANVAS: 1,
        BETACANVAS: 2,
        onPlayingAnimation: false,
        changingMapState: {
          changingCurrentMap: false,
          changingNewMap: false
        },
        RESOURCE_TYPE: {
          TEXT: 1,
          IMAGE: 2,
          VIDEO: 3
        },
        preloadState: void 0,
        START: 0,
        COMPLETE: 1,
        SCREENWIDTH: 1024,
        SCREENHEIGHT: 680,
        colors: {
          'WHITE': '255, 255, 255',
          'SKYBLUE': '1, 255, 255',
          'YELLOW': '255, 255, 0',
          'PANELBG': '0, 0, 0'
        },
        fontFamily: {
          'DEFAULT': 'hooge0665',
          'PARAGRAPH': 'arial',
          'LABEL': 'hooge0655'
        },
        fontSize: {
          'TINY': '6px',
          'SMALL': '8px',
          'NORMAL': '10px',
          'LARGE': '12px',
          'LARGER': '16px',
          'INTROTEXT': '18px',
          'EXTRALARGE': '18px',
          'TITLE': '22px'
        },
        canvas: void 0,
        context: void 0,
        loginScreen: {
          progressBar: {
            width: 0,
            maxWidth: 200,
            height: 10,
            fill: true,
            fillColor: 'SKYBLUE',
            strokeColor: 'SKYBLUE',
            x: 412,
            y: 335
          },
          loginCover: {
            fillColor: 'PANELBG',
            strokeColor: 'PANELBG',
            fill: true
          },
          loginRetangleModel: {
            width: 8,
            height: 8,
            fill: true,
            fillColor: 'WHITE',
            strokeColor: 'WHITE',
            visible: false,
            fillAlpha: 0,
            strokeAlpha: 0
          },
          loginRetangleColumns: [],
          isCoverFadeOut: false
        },
        navigationPanel: {
          bgImage: void 0,
          spaceship: void 0,
          logoutButton: {
            text: 'LOGOUT',
            x: 950,
            y: 40,
            fontWeight: 'normal',
            fontFamily: 'DEFAULT',
            fontSize: 'SMALL',
            hitspot: {
              x: 948,
              y: 32,
              width: 45,
              height: 10
            }
          },
          title: {
            text: '',
            x: 540,
            y: 40,
            fontWeight: 'bold',
            fontFamily: 'DEFAULT',
            fontSize: 'TITLE',
            color: 'SKYBLUE',
            textAlign: 'right'
          },
          subTitle: {
            text: 'DYNASTY',
            x: 545,
            y: 40,
            fontWeight: 'normal',
            fontFamily: 'DEFAULT',
            fontSize: 'SMALL',
            textAlign: 'left'
          },
          userName: {
            text: 'JAKE',
            x: 800,
            y: 92,
            fontWeight: 'normal',
            fontFamily: 'DEFAULT',
            fontSize: 'TITLE'
          },
          startYear: {
            text: '',
            x: 509,
            y: 80,
            fontWeight: 'normal',
            fontFamily: 'DEFAULT',
            fontSize: 'LARGER',
            textAlign: 'right'
          },
          startYearPeriod: {
            text: '',
            x: 525,
            y: 80,
            fontWeight: 'normal',
            fontFamily: 'DEFAULT',
            fontSize: 'TINY',
            textAlign: 'right'
          },
          endYear: {
            text: '',
            x: 585,
            y: 80,
            fontWeight: 'normal',
            fontFamily: 'DEFAULT',
            fontSize: 'LARGER',
            textAlign: 'right'
          },
          endYearPeriod: {
            text: '',
            x: 595,
            y: 80,
            fontWeight: 'normal',
            fontFamily: 'DEFAULT',
            fontSize: 'TINY',
            textAlign: 'right'
          },
          power: {
            percentage: {
              text: '60%',
              value: 60,
              x: 151,
              y: 67,
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL',
              color: 'SKYBLUE',
              chartModel: {
                fill: true,
                step: 20,
                xOffset: -1,
                yOffset: 0,
                startX: 208.5,
                startY: 65,
                gap: 2,
                width: 3,
                height: 10,
                color: 'SKYBLUE'
              }
            },
            label: {
              text: 'POWER',
              x: 176,
              y: 90,
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL'
            },
            frame: {
              x: 180,
              y: 62,
              width: 30,
              height: 16,
              radius: 0,
              lineWidth: 2
            }
          },
          location: {
            e: {
              text: {
                text: '110.32',
                x: 160,
                y: 40,
                fontWeight: 'normal',
                fontFamily: 'DEFAULT',
                fontSize: 'TINY'
              },
              label: {
                text: 'E',
                color: 'SKYBLUE',
                x: 152,
                y: 40,
                fontWeight: 'normal',
                fontFamily: 'DEFAULT',
                fontSize: 'TINY'
              }
            },
            n: {
              text: {
                text: '66.32',
                x: 160,
                y: 48,
                fontWeight: 'normal',
                fontFamily: 'DEFAULT',
                fontSize: 'TINY'
              },
              label: {
                text: 'N',
                color: 'SKYBLUE',
                x: 152,
                y: 48,
                fontWeight: 'normal',
                fontFamily: 'DEFAULT',
                fontSize: 'TINY'
              }
            },
            circle: {
              x: 198,
              y: 38,
              r: 11,
              lineWidth: 2
            },
            pointer: {
              x: 196,
              y: 36,
              r: 2,
              fillColor: 'SKYBLUE',
              strokeColor: 'SKYBLUE',
              fill: true,
              lineWidth: 1
            },
            pointerMin: {
              x: 187,
              y: 27
            },
            pointerMax: {
              x: 209,
              y: 38
            },
            eRange: {
              min: 30,
              max: 180
            },
            nRange: {
              max: 90,
              min: 0
            }
          },
          progress: {
            label: {
              text: 'PROGRESS',
              x: 225,
              y: 50,
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL'
            },
            percentage: {
              text: '75%',
              x: 285,
              y: 50,
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL',
              color: 'SKYBLUE'
            },
            state: {
              x: 224,
              y: 57,
              complete: 0.75,
              width: 225,
              lineWidth: 1,
              completeStrokeColor: 'SKYBLUE',
              completeLineWidth: 3,
              pointer: {
                x: 300,
                y: 60,
                width: 10,
                height: 5,
                fillColor: 'SKYBLUE',
                strokeColor: 'SKYBLUE',
                fill: true
              }
            }
          },
          topicStates: [
            {
              label: {
                text: 'HISTORY',
                x: 238,
                y: 70,
                fontWeight: 'normal',
                fontFamily: 'DEFAULT',
                fontSize: 'SMALL'
              },
              statePercentage: { completePercentage: 1 }
            },
            {
              label: {
                text: 'SOCIETY',
                x: 315,
                y: 70,
                fontWeight: 'normal',
                fontFamily: 'DEFAULT',
                fontSize: 'SMALL'
              },
              statePercentage: { completePercentage: 0.6 }
            },
            {
              label: {
                text: 'CULTURE',
                x: 400,
                y: 70,
                fontWeight: 'normal',
                fontFamily: 'DEFAULT',
                fontSize: 'SMALL'
              },
              statePercentage: { completePercentage: 0.75 }
            },
            {
              label: {
                text: 'MILITARY',
                x: 238,
                y: 82,
                fontWeight: 'normal',
                fontFamily: 'DEFAULT',
                fontSize: 'SMALL'
              },
              statePercentage: { completePercentage: 0.4 }
            },
            {
              label: {
                text: 'TECHNOLOGY',
                x: 380,
                y: 82,
                fontWeight: 'normal',
                fontFamily: 'DEFAULT',
                fontSize: 'SMALL'
              },
              statePercentage: { completePercentage: 0.7 }
            }
          ],
          folderLabels: [
            {
              text: 'images/',
              x: 220,
              y: 97,
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL'
            },
            {
              text: 'videos/',
              x: 310,
              y: 97,
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL'
            },
            {
              text: 'stories/',
              x: 400,
              y: 97,
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL'
            }
          ],
          level: {
            text: 'Advanced level',
            x: 610,
            y: 97,
            fontWeight: 'normal',
            fontFamily: 'DEFAULT',
            fontSize: 'SMALL',
            color: 'SKYBLUE'
          },
          soundEffect: {
            retangleMarker: {
              x: 615,
              y: 32,
              width: 2,
              height: 4,
              fill: true
            },
            polygonMarker: {
              points: [
                {
                  x: 618,
                  y: 32
                },
                {
                  x: 622,
                  y: 28
                },
                {
                  x: 622,
                  y: 40
                },
                {
                  x: 618,
                  y: 36
                }
              ],
              fill: true,
              lineWidth: 1
            },
            underline: {
              startX: 624,
              startY: 40,
              lineWidth: 0.5,
              endX: 700,
              endY: 38
            },
            lineChart: {
              startX: 624,
              startY: 20,
              width: 5,
              height: 20,
              gap: 2,
              cylinders: [
                { percentage: 0.6 },
                { percentage: 0.7 },
                { percentage: 1 },
                { percentage: 0.2 },
                { percentage: 0.3 },
                { percentage: 0.4 },
                { percentage: 0.65 },
                { percentage: 0.8 },
                { percentage: 0.3 },
                { percentage: 0.5 }
              ]
            }
          },
          dateAndTime: {
            retangle: {
              x: 705,
              y: 24,
              width: 8,
              height: 16,
              strokeColor: 'YELLOW',
              fillColor: 'YELLOW',
              fill: true
            },
            date: {
              x: 717,
              y: 30,
              text: '0897-09-28',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL'
            },
            time: {
              text: '23:09:02',
              x: 717,
              y: 40,
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL'
            }
          },
          signal: {
            icon: {
              lines: [
                {
                  startX: 870,
                  startY: 24,
                  endX: 880,
                  endY: 24
                },
                {
                  startX: 870,
                  startY: 24,
                  endX: 875,
                  endY: 30
                },
                {
                  startX: 880,
                  startY: 24,
                  endX: 875,
                  endY: 30
                },
                {
                  startX: 875,
                  startY: 24,
                  endX: 875,
                  endY: 40
                }
              ]
            },
            bar: {
              startX: 880,
              startY: 22,
              width: 5,
              height: 18,
              gap: 2,
              cylinders: [
                { percentage: 0.2 },
                { percentage: 0.4 },
                { percentage: 0.6 },
                { percentage: 0.8 },
                { percentage: 1 }
              ]
            }
          },
          connect: {
            bgImage: void 0,
            startX: 800,
            y: 35,
            r: 2,
            totalNumber: 6,
            gap: 7,
            circles: [],
            strokeColor: 'WHITE',
            fillColor: 'WHITE'
          }
        },
        panelSettings: {
          totalShowingPanel: 1,
          showingPanelContainers: [
            {
              x: 692,
              y: 105,
              panel: void 0
            },
            {
              x: 507,
              y: 172,
              panel: void 0
            },
            {
              x: 507,
              y: 342,
              panel: void 0
            },
            {
              x: 197,
              y: 342,
              panel: void 0
            }
          ],
          normalPanel: {
            width: 300,
            height: 160
          },
          maximizedPanel: {
            x: 132,
            y: 105,
            width: 740,
            height: 460,
            padding: 10,
            fontSize: 'EXTRALARGE',
            lineHeight: 25,
            lineWidthOffset: 350,
            hitspot: {
              x: 132,
              y: 105,
              width: 740,
              height: 460
            }
          },
          buttonMargin: 0,
          maximizedButton: {
            width: 40,
            height: 40
          },
          buttonClose: {
            buttonName: 'buttonClose',
            image: void 0,
            x: void 0,
            y: void 0,
            width: 20,
            height: 20,
            visible: true
          },
          buttonPlay: {
            buttonName: 'buttonPlay',
            x: void 0,
            y: void 0,
            width: 20,
            height: 20,
            visible: true
          },
          buttonPause: {
            buttonName: 'buttonPause',
            x: void 0,
            y: void 0,
            width: 20,
            height: 20,
            visible: true
          },
          buttonRestoreDown: {
            buttonName: 'buttonRestoreDown',
            x: void 0,
            y: void 0,
            width: 20,
            height: 20,
            visible: true
          },
          buttonMaximize: {
            buttonName: 'buttonMaximize',
            x: void 0,
            y: void 0,
            width: 20,
            height: 20,
            visible: true
          },
          textPanel: {
            padding: 10,
            maxWidth: 300,
            maxHeight: 160,
            lineWidthOffset: 80,
            visible: true,
            buttonClose: {},
            buttonMaximize: {},
            buttonRestoreDown: {},
            text: {
              text: void 0,
              x: void 0,
              y: void 0,
              width: void 0,
              height: void 0,
              color: 'WHITE',
              fontWeight: 'normal',
              fontFamily: 'PARAGRAPH',
              fontSize: 'LARGE',
              textAlign: 'left',
              textBaseline: 'hanging',
              lineHeight: 18
            },
            frame: {
              x: void 0,
              y: void 0,
              width: void 0,
              height: void 0,
              lineWidth: 8,
              strokeColor: 'SKYBLUE',
              strokeAlpha: 1,
              fillColor: 'PANELBG',
              fillAlpha: 0.95,
              fill: true
            },
            mask: {
              x: void 0,
              y: void 0,
              width: void 0,
              height: void 0
            },
            hitspot: {}
          },
          imagePanel: {
            padding: 5,
            maxWidth: 300,
            maxHeight: 160,
            visible: true,
            buttonClose: {},
            image: {
              x: void 0,
              y: void 0,
              width: void 0,
              height: void 0,
              data: void 0
            },
            frame: {
              x: void 0,
              y: void 0,
              width: void 0,
              height: void 0,
              lineWidth: 8,
              strokeColor: 'SKYBLUE',
              strokeAlpha: 1,
              fillColor: 'PANELBG',
              fillAlpha: 0.95,
              fill: true
            },
            mask: {
              x: void 0,
              y: void 0,
              width: void 0,
              height: void 0
            }
          },
          videoPanel: {
            padding: 5,
            maxWidth: 300,
            maxHeight: 160,
            visible: true,
            x: void 0,
            y: void 0,
            width: void 0,
            height: void 0,
            video: void 0,
            frame: {
              x: void 0,
              y: void 0,
              width: void 0,
              height: void 0,
              lineWidth: 8,
              strokeColor: 'SKYBLUE',
              strokeAlpha: 1,
              fillColor: 'PANELBG',
              fillAlpha: 0.95,
              fill: true
            },
            mask: {
              x: void 0,
              y: void 0,
              width: void 0,
              height: void 0
            },
            text: {
              x: 0,
              y: -200,
              color: 'YELLOW',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL',
              textAlign: 'right'
            }
          }
        },
        timelinePanel: {
          x: 0,
          y: 620,
          offset: 10,
          currentDynastyId: void 0,
          mouseDownCoordinate: void 0,
          mouseCurrentCoordinate: void 0,
          mouseMoveCoordinate: void 0,
          mouseUpCoordinate: void 0,
          moveRange: {
            min: -380,
            max: 180
          },
          retangleMask: {
            x: 112,
            y: 600,
            width: 800,
            height: 80
          },
          hitspot: {
            x: 112,
            y: 600,
            width: 800,
            height: 80
          },
          progessionBar: {
            x: 0,
            y: void 0,
            maxLength: 630,
            dyanstyMarginLeft: 8
          },
          dynastyHitspots: [],
          dynastyModel: {
            fillColor: 'PANELBG',
            strokeColor: 'SKYBLUE',
            strokeAlpha: 0.7,
            fillAlpha: 0.7,
            width: 26,
            height: 26,
            marginLeft: 4,
            fill: true,
            yearCharacterWidth: 5.5,
            startYear: {
              text: void 0,
              x: 0,
              y: -10,
              color: 'WHITE',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL',
              textAlign: 'left'
            },
            endYear: {
              text: void 0,
              x: 0,
              y: -10,
              color: 'WHITE',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL',
              textAlign: 'right'
            },
            name: {
              x: void 0,
              y: void 0,
              color: 'WHITE',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL',
              textAlign: 'center'
            }
          },
          currentDynastyModel: {
            fillColor: 'SKYBLUE',
            strokeColor: 'SKYBLUE'
          },
          pointer: {
            x: void 0,
            y: 670,
            fillColor: 'SKYBLUE',
            strokeColor: 'SKYBLUE',
            width: 9,
            height: 6,
            points: [],
            fill: true
          },
          timeLine: {
            x: void 0,
            y: 665,
            textMiddleSpace: 20,
            textMarginLeft: 10,
            textMarginRight: 10,
            lineBC: {
              startX: void 0,
              startY: void 0,
              endX: void 0,
              endY: void 0,
              width: 290,
              height: 16,
              radius: 0,
              lineWidth: 1
            },
            textBC: {
              text: 'BC',
              x: void 0,
              y: void 0,
              color: 'YELLOW',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL',
              textAlign: 'center',
              textBaseline: 'middle'
            },
            textDC: {
              text: 'DC',
              x: void 0,
              y: void 0,
              color: 'YELLOW',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'SMALL',
              textAlign: 'center',
              textBaseline: 'middle'
            },
            lineDC: {
              startX: void 0,
              startY: void 0,
              endX: void 0,
              endY: void 0,
              width: 860,
              height: 16,
              radius: 0,
              lineWidth: 1
            }
          }
        },
        categoryPanel: {
          panelWidth: 120,
          hitspot: {
            x: void 0,
            y: void 0,
            width: void 0,
            height: void 0
          },
          enableRetangle: {
            x: 10,
            y: void 0,
            width: 13,
            height: 13,
            fill: false,
            strokeColor: 'YELLOW',
            lineWidth: 2,
            innerRetangle: {
              x: 14,
              y: void 0,
              width: 5,
              height: 5,
              fill: true,
              strokeColor: 'YELLOW',
              fillColor: 'YELLOW',
              lineWidth: 2
            }
          },
          disableRetangle: {
            x: 10,
            y: void 0,
            width: 13,
            height: 13,
            fill: false,
            strokeColor: 'YELLOW',
            lineWidth: 2
          },
          categoryIndexs: [
            'history',
            'society',
            'culture',
            'military',
            'technology'
          ],
          categoryLabels: [
            {
              text: 'HISTORY',
              x: 30,
              y: 120,
              enable: true,
              color: 'SKYBLUE',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'NORMAL',
              hitspot: {}
            },
            {
              text: 'SOCIETY',
              x: 30,
              y: 140,
              enable: true,
              color: 'SKYBLUE',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'NORMAL',
              hitspot: {}
            },
            {
              text: 'CULTURE',
              x: 30,
              y: 160,
              enable: true,
              color: 'SKYBLUE',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'NORMAL',
              hitspot: {}
            },
            {
              text: 'MILITARY',
              x: 30,
              y: 180,
              enable: true,
              color: 'SKYBLUE',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'NORMAL',
              hitspot: {}
            },
            {
              text: 'TECHNOLOGY',
              x: 30,
              y: 200,
              enable: true,
              color: 'SKYBLUE',
              fontWeight: 'normal',
              fontFamily: 'DEFAULT',
              fontSize: 'NORMAL',
              hitspot: {}
            }
          ]
        },
        mapAreaPanel: {
          hitspot: {
            x: 132,
            y: 105,
            width: 860,
            height: 465
          }
        }
      };
    }]);
});  //# sourceMappingURL=systemparameters.js.map
