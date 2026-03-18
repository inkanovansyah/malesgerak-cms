import { ImageResponse } from 'next/og';

export const size = {
    width: 1200,
    height: 600,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'linear-gradient(to bottom right, #000 0%, #1a1a1a 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                {/* Neon accent line */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '8px',
                        background: '#ccff00',
                    }}
                />

                {/* Logo/Brand */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '20px',
                    }}
                >
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            background: '#ccff00',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '48px', color: '#000' }}>⚡</span>
                    </div>
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: '72px',
                        fontWeight: 900,
                        letterSpacing: '-2px',
                        color: '#fff',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                    }}
                >
                    MAKNAUANG
                </div>

                {/* Tagline */}
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: 500,
                        color: '#ccff00',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        marginTop: '10px',
                    }}
                >
                    DARI PERGOLAKAN DUNIA MENUJU STABILITAS FINANCIAL
                </div>

                {/* Bottom accent */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '8px',
                        background: '#ccff00',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
