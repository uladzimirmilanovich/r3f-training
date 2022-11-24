import { ShaderMaterial, Texture, UniformsUtils } from 'three';

export type MergeTexturesMaterialParams = {
  texture1?: Texture;
  texture2?: Texture;
};

export class MergeTexturesMaterial extends ShaderMaterial {
  constructor(params: MergeTexturesMaterialParams) {
    const mergeMaterialParams = {
      uniforms: UniformsUtils.merge([
        {
          texture1: null,
          texture2: null,
        },
      ]),
      vertexShader: `
       precision highp float;
       precision highp int;
       
       //uniform mat4 modelViewMatrix;
       //uniform mat4 projectionMatrix;
       //attribute vec3 position;
       //attribute vec2 uv;
       varying vec2 vUv;
       
       void main() {
         vUv = uv;
         gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
       }
     `,
      fragmentShader: `
       precision mediump float;
       uniform sampler2D texture1;
       uniform sampler2D texture2;
       varying vec2 vUv;
       
       void main() {
         vec4 t1 = texture2D( texture1, vUv );
         vec4 t2 = texture2D( texture2, vUv );
         gl_FragColor = vec4(mix(t1.rgb, t2.rgb, t2.a), 1.0);
       }
     `,
    };

    super(mergeMaterialParams);

    if (params.texture1) {
      this.uniforms.texture1.value = params.texture1;
    }

    if (params.texture2) {
      this.uniforms.texture2.value = params.texture2;
    }
  }
}
