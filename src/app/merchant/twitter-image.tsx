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

                {/* Sun icon */}
                <div
                    style={{
                        fontSize: '80px',
                        marginBottom: '20px',
                    }}
                >
                    ☀️
                </div>

                {/* Brand */}
                <div
                    style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#ccff00',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                    }}
                >
                    MAKNA UANG SOLAR
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: '64px',
                        fontWeight: 900,
                        letterSpacing: '-2px',
                        color: '#fff',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        lineHeight: 1.1,
                    }}
                >
                    PANEL SURYA<br />BERKUALITAS
                </div>

                {/* Price range */}
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: 600,
                        color: '#fff',
                        marginTop: '20px',
                        letterSpacing: '2px',
                    }}
                >
                    MULAI RP 850.000
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
