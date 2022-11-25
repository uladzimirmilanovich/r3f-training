import { ShaderMaterialParameters, Vector2 } from 'three';

export const shaderConfig: ShaderMaterialParameters = {
  uniforms: {
    time: { value: 0 },
    resolution: { value: new Vector2(512, 512) },
  },
  vertexShader: `
    varying vec2 vUv;

    void main()
    {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    precision highp float;

    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;

    void mainImage(out vec4 color, vec2 position)
    {
      vec3 p = vec3(resolution, 20.);
      vec3 d = -.7 * vec3(position + position - p.xy, p)/p.x;
      vec3 c = vec3(0.,0.,0.);
      vec3 i = c;

      float boarderWidth = 30.;

      if (position.x < boarderWidth
        || position.y < boarderWidth
        || position.y > resolution.y - boarderWidth
        || position.x > resolution.x - boarderWidth
      ) {
        color = vec4(255,255,255,255);
      } else {
        for(int x = 0; x < 100; ++x) {
          if (i.x >= 1.) break;
          p = c,
          p.z -= time + (i.x+=1.0e-2),
          p.xy *= mat2(sin((p.z*=.1) + vec4(0.,17,39,0)));
          c += length(sin(p.yx)+cos(p.xz + time))*d;
        }

        color = 1.-vec4(12,60,256,123)/length(c);
      }
    }

    void main(void)
    {
        mainImage(gl_FragColor, vUv * 512.);
        gl_FragColor.a = 180.;
    }
  `,
};
