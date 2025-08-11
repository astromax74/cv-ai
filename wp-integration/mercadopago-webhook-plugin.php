<?php
/*
Plugin Name: CV AI - MercadoPago Webhook
Description: Recibe notificaciones de pago de MercadoPago y envía el PDF al email del comprador.
Version: 0.1.0
Author: You
*/

// Ruta: /wp-json/cv-ai/v1/notify
add_action('rest_api_init', function () {
  register_rest_route('cv-ai/v1', '/notify', [
    'methods' => 'POST',
    'callback' => 'cv_ai_notify',
    'permission_callback' => '__return_true'
  ]);
});

function cv_ai_notify(WP_REST_Request $request) {
  $body = $request->get_json_params();
  // TODO: validar firma/hmac y consultar pago en MP
  $email = isset($body['email']) ? sanitize_email($body['email']) : '';
  $pdf_url = isset($body['pdfUrl']) ? esc_url_raw($body['pdfUrl']) : '';

  if (!$email || !$pdf_url) {
    return new WP_REST_Response(['ok' => false, 'error' => 'missing_params'], 400);
  }

  $subject = 'Tu CV está listo';
  $message = 'Gracias por tu compra. Descargá tu CV: ' . $pdf_url;
  $headers = ['Content-Type: text/html; charset=UTF-8'];
  wp_mail($email, $subject, $message, $headers);

  return ['ok' => true];
}